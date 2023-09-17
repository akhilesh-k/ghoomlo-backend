const fs = require("fs");
const https = require("https");

// Function to fetch JSON data from the given URL
function fetchJsonData(url, callback) {
  https.get(url, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        const jsonData = JSON.parse(data);
        callback(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });
  });
}

// Function to generate the sitemap.xml content for unique city pairs
function generateSitemap(cityList) {
  const currentDate = new Date().toISOString().split("T")[0];
  const sitemapHeader =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const sitemapFooter = "</urlset>";

  const urls = [];

  // Generate unique city pair combinations
  for (let i = 0; i < cityList.length; i++) {
    const city1 = cityList[i].name.toLowerCase().replace(/\s+/g, "-");
    for (let j = 0; j < cityList.length; j++) {
      if (i !== j) {
        const city2 = cityList[j].name.toLowerCase().replace(/\s+/g, "-");
        const url =
          `<url>\n` +
          `<loc>https://www.ghoomlo.co.in/outstation-taxi/${city1}-to-${city2}-cabs</loc>\n` +
          `<lastmod>${currentDate}</lastmod>\n` +
          `<changefreq>weekly</changefreq>\n` +
          `<priority>0.9</priority>\n` +
          `</url>`;
        urls.push(url);
      }
    }
  }
  console.log(urls.length);
  return sitemapHeader + urls.join("\n") + sitemapFooter;
}

// Fetch the JSON data and generate the sitemap
fetchJsonData(
  "https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json",
  (data) => {
    // Filter cities where state is Bihar (case-insensitive)
    const filteredCities = data.filter(
      (city) => city.state.toLowerCase() === "bihar"
    );

    // Generate the sitemap.xml content
    const sitemapContent = generateSitemap(filteredCities);

    // Write the sitemap.xml file
    fs.writeFileSync("sitemap.xml", sitemapContent, "utf-8", (err) => {
      if (err) {
        console.error("Error writing sitemap.xml:", err);
      } else {
        console.log("Sitemap.xml generated successfully.");
      }
    });
  }
);
