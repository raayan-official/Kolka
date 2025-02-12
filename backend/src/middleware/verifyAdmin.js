const verifyAdmin = (req, res, next) => {
    console.log("User role from token:", req.role);  // Debugging line
    if (req.role !== 'admin') {
      return res.status(403).send({
        success: false, 
        message: "You are not authorized to perform this action"
      });
    }
    next();
  };
  
  module.exports = verifyAdmin; // ✅ ঠিক
  