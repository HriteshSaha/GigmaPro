const express = require("express");
const path = require("path");
require("dotenv").config();

const homeRoute = require("./routes/homePageRoute.js");
const clientSignupRoute = require("./routes/clientRegistrationRoute.js");
const freelancerSignupRoute = require("./routes/freelancerRegistrationRoute.js");
const loginRoute = require("./routes/loginRoute.js");
const freelancerDashboardRoute = require("./routes/freelancerdashboardRoute.js");
const clientDashboardRoute = require('./routes/clientDashboardRoute.js')

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))

app.use("/", homeRoute);
app.use("/", clientSignupRoute);
app.use("/", freelancerSignupRoute);
app.use("/", loginRoute);
app.use("/", freelancerDashboardRoute);
app.use("/", clientDashboardRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
