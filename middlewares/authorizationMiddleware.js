// isClient middleware
const isClient = (req, res, next) => {
  console.log("Checking for Client role:");
  console.log("Session data:", req.session); // Log full session object
  if (req.session && req.session.user && req.session.user.role === 'Client') {
    console.log("Client role confirmed");
    next();
  } else {
    console.log("Access Denied: Not a Client");
    return res.status(403).send('Access Denied');
  }
};

// isFreelancer middleware
const isFreelancer = (req, res, next) => {
  console.log("Checking for Freelancer role:");
  console.log("Session data:", req.session); // Log full session object
  if (req.session && req.session.user && req.session.user.role === 'Freelancer') {
    console.log("Freelancer role confirmed");
    next();
  } else {
    console.log("Access Denied: Not a Freelancer");
    return res.status(403).send('Access Denied');
  }
};


module.exports = {isClient, isFreelancer}