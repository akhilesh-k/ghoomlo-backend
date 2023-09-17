const axios = require("axios");
require("dotenv").config();
const BING_MAP_KEY = process.env.BING_API_KEY;
const OP_COUNTRY_CODE = "IN";

const BookingRequest = require("../models/booking-request");
const { getDatabase } = require("../database/db");

async function requestBooking(bookingData) {
  const db = getDatabase(); // Obtain the db object
  const newBooking = await db
    .collection("booking-request")
    .insertOne(bookingData);
  return newBooking;
}

// Service function to get all bookings
async function getAllBookings() {
  const bookingList = await BookingRequest.find();
  return bookingList;
}

async function getCoordinatesForSuggestion(suggestion) {
  if (typeof suggestion !== "string" || suggestion.trim() === "") {
    console.error("Invalid suggestion:", suggestion);
    return null;
  }

  try {
    const url = `http://dev.virtualearth.net/REST/v1/Locations?q=${encodeURIComponent(
      suggestion
    )}&key=${BING_MAP_KEY}`;

    const response = await axios.get(url);
    const coordinates =
      response.data.resourceSets[0]?.resources[0]?.point?.coordinates;

    return coordinates || null;
  } catch (error) {
    console.error("Error getting coordinates: ", error);
    return null;
  }
}

async function findPlaces(searchTerm, userLatitude, userLongitude) {
  try {
    // Build the base URL for the Bing Maps Autosuggest API
    const baseUrl = `http://dev.virtualearth.net/REST/v1/Autosuggest`;

    // Define query parameters
    const queryParams = {
      query: searchTerm,
      maxResults: 5,
      includeEntityTypes: "Place",
      ur: "IN",
      cf: OP_COUNTRY_CODE,
      key: BING_MAP_KEY,
    };

    // If userLatitude and userLongitude are provided, add them to the URL
    if (userLatitude && userLongitude) {
      queryParams.userLocation = `${userLatitude},${userLongitude}`;
    }

    // Construct the full URL with query parameters
    const url = `${baseUrl}?${Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;

    // Make the API request
    const response = await axios.get(url);
    const suggestions = response.data.resourceSets[0].resources[0].value;
    const result = {};

    // Create a Set to track unique coordinates and addresses
    const uniqueCoordinates = new Set();
    const uniqueAddresses = new Set();

    // Create arrays to store the filtered suggestions
    const filteredSuggestions = [];
    const filteredCoordinates = [];

    // Iterate through the suggestions
    for (let i = 0; i < suggestions.length; i++) {
      const suggestion = suggestions[i];
      const coordinates = await getCoordinatesForSuggestion(
        suggestion.address.formattedAddress
      );
      if (coordinates) {
        const coordinatesString = coordinates.join(",");
        if (
          !uniqueCoordinates.has(coordinatesString) &&
          !uniqueAddresses.has(suggestion.address.formattedAddress)
        ) {
          uniqueCoordinates.add(coordinatesString);
          uniqueAddresses.add(suggestion.address.formattedAddress);
          filteredSuggestions.push({
            address: suggestion.address.formattedAddress,
            coordinates: coordinates,
          });
        }
      }
    }

    result.places = filteredSuggestions;

    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error suggesting locations: ", error);
    return error;
  }
}

// Function to find the distance between two cities
async function findDistance(city1, city2) {
  try {
    // Construct the Bing Maps Routes API URL
    const baseUrl = "http://dev.virtualearth.net/REST/v1/Routes";
    const queryParams = {
      o: "json",
      "wp.0": city1,
      "wp.1": city2,
      key: BING_MAP_KEY,
    };

    const url = `${baseUrl}?${Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;

    // Make the API request
    const response = await axios.get(url);
    const route = response.data.resourceSets[0].resources[0];

    // Extract and return the distance and directions
    const distance = route.travelDistance; // Distance in kilometers
    const directions = route.routeLegs[0].itineraryItems.map(
      (item) => item.instruction
    );

    return { distance, directions };
  } catch (error) {
    console.error("Error finding distance: ", error);
    throw error;
  }
}

module.exports = {
  requestBooking,
  getAllBookings,
  findPlaces,
};
