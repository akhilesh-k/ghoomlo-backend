// Simulated user data store
const users = [
  {
    id: "1",
    username: "user1",
    email: "user1@example.com",
    passwordHash: "hashed_password_1",
    salt: "salt_1",
    resetTokens: [],
  },
  {
    id: "2",
    username: "user2",
    email: "user2@example.com",
    passwordHash: "hashed_password_2",
    salt: "salt_2",
    resetTokens: [],
  },
  // Add more user objects as needed
];

/**
 * Find a user by their email address.
 * @param {string} email - User's email address.
 * @returns {object} User object or null if not found.
 */
function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

/**
 * Find a user by their user ID.
 * @param {string} userId - User's ID.
 * @returns {object} User object or null if not found.
 */
function findUserById(userId) {
  return users.find((user) => user.id === userId);
}

/**
 * Store an OTP for a user.
 * @param {string} userId - User's ID.
 * @param {string} otp - One-time password.
 */
async function storeOTP(userId, otp) {
  // In a real application, store the OTP securely in a database for the user
  const user = findUserById(userId);
  if (user) {
    // Simulated storage: Add the OTP to the user object
    user.otp = otp;
  }
}

/**
 * Retrieve a stored OTP for a user.
 * @param {string} userId - User's ID.
 * @returns {string} Stored OTP or null if not found.
 */
async function getStoredOTP(userId) {
  const user = findUserById(userId);
  return user ? user.otp : null;
}

/**
 * Verify a password reset token for a user.
 * @param {string} email - User's email address.
 * @param {string} resetToken - Password reset token.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
async function verifyResetToken(email, resetToken) {
  const user = findUserByEmail(email);
  if (user && user.resetTokens.includes(resetToken)) {
    // Mark the token as used (remove it from the list)
    user.resetTokens = user.resetTokens.filter((token) => token !== resetToken);
    return true;
  }
  return false;
}

/**
 * Update a user's password.
 * @param {string} email - User's email address.
 * @param {string} newPasswordHash - New hashed password.
 * @param {string} newSalt - New salt for hashing.
 */
async function updatePassword(email, newPasswordHash, newSalt) {
  const user = findUserByEmail(email);
  if (user) {
    // Update the user's password hash and salt
    user.passwordHash = newPasswordHash;
    user.salt = newSalt;
  }
}

/**
 * Invalidate a password reset token for a user.
 * @param {string} email - User's email address.
 * @param {string} resetToken - Password reset token to invalidate.
 */
async function invalidateResetToken(email, resetToken) {
  const user = findUserByEmail(email);
  if (user) {
    // Remove the token from the user's list of reset tokens
    user.resetTokens = user.resetTokens.filter((token) => token !== resetToken);
  }
}

module.exports = {
  findUserByEmail,
  findUserById,
  storeOTP,
  getStoredOTP,
  verifyResetToken,
  updatePassword,
  invalidateResetToken,
};
