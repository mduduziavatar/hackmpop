const jwt = require('jsonwebtoken');

// Secret key for signing and verifying JWTs
const secretKey = '1761'; // Replace with a secure secret key

// Function to generate a JWT token for a user
function generateAuthToken(user) {
  // Define the payload to be included in the token
  const payload = {
    userId: user.id, // You can customize the payload with user data
    username: user.username, // Add any user-related information here
  };

  // Generate a signed JWT token with the payload and secret key
  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h', // Token expiration time (e.g., 1 hour)
  });

  return token;
}

// Middleware function to verify JWT tokens in requests
function verifyAuthToken(req, res, next) {
  // Extract the token from the request headers, query, or cookies
  const token = req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the decoded payload to the request object for further use
    req.user = decoded;
    next();
  });
}

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};
