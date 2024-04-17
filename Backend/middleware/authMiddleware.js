const config = require("config");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

 
  if (!token)
    return res.status(401).send({ msg: "No token, authorization denied" });

  try {
  
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ msg: "Token is expired or invalid", err });
  }
}

module.exports = authMiddleware;
