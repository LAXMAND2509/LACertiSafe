// const jwt = require("jsonwebtoken");
// const Institute = require("../models/instituteModel");

// // Middleware function to verify JWT tokens
// const verifyToken = async (req, res, next) => {
//   // console.log(req);
//   const token = req.header("Authorization").split(" ")[1];
//   console.log(token);

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied, no token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     // Fetch the institute from the database using the instituteID in the token
//     const fetchedInstitute = await Institute.findById(decoded.instituteID);

//     if (!fetchedInstitute) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // Attach the institute object to the request for further use in the route handlers
//     req.institute = fetchedInstitute;

//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ")[1];
    if (token) {
      try {
        const userInfo = await jwt.verify(token, process.env.SECRET_KEY);
        req.userInfo = userInfo;
        console.log("Success here at least");
        next();
      } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
      }
    } else {
      return res.status(401).json({ message: "unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = auth;
