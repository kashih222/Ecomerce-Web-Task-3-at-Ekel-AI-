const jwt = require("jsonwebtoken");

const guestAuthMiddleware = (req, res, next) => {
  try {
    const cookieToken = req.cookies && req.cookies.token;
    let token = cookieToken;
    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
    
    next();
  } catch (err) {
   
    next(); 
  }
};

module.exports = guestAuthMiddleware;
