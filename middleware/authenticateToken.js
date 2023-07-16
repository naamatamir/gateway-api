const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
// Extract the token from the Authorization header
const authHeader = req.headers.authorization;
if (!authHeader) {
  return res.status(401).json({ error: 'No token provided.' });
}
if (!authHeader.startsWith('Bearer ')) {
  return res.status(401).json({ error: 'Invalid token format.' });
}
const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user object to the request
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('Error in authentication middleware:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

module.exports = authenticateToken;
