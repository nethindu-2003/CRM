const { auth } = require('../config/firebase');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  if (!auth) {
    return res.status(500).json({ error: 'Firebase Auth is not initialized.' });
  }
  
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.email
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Unauthorized or token expired' });
  }
};

module.exports = { authenticateToken };
