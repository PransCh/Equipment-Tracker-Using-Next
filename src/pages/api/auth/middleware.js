import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, 'prans', (err, decoded) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
}