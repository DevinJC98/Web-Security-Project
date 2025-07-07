const express = require("express");
const https = require("https");
const app = express();
const fs = require("fs");
const path = require("path");
//auth and auth dependancies
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
//env variables
require("dotenv").config();
//rbac
const adminRoutes = require("./routes/admin");

const helmet = require("helmet");

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

//default route/home page
app.get("/", (req, res) => {
  console.log("app default route");
  //information is unlikely to be change and will not need to be cached
  res.set("CacheControl", "no-store");
  res.send("<h1>Default Route</h1>");
});
//Daily Quest Page
app.get("/daily-quests", (req, res) => {
  console.log("Daily Quest Page");
  //cache information for 24 hours
  res.set("CacheControl", "max-age=86400");
  res.send("<h1>Daily Quests</h1>");
});
//Weekly Quest Page
app.get("/weekly-quests", (req, res) => {
  console.log("Weekly Quest Page");
  //cache information for 1 Week
  res.set("CacheControl", "max-age=604800");
  res.send("<h1>Weekly Quests</h1>");
});
//User Dashboard
app.get("/user-dashboard", (req, res) => {
  console.log("user dashboard");
  //don't cache due to potentially sensitive data
  res.set("CacheControl", "no-store");
  res.send("<h1>User Dashboard</h1>");
});
//About Page
app.get("/about", (req, res) => {
  console.log("About Page");
  //information is unlikely to be change and will not need to be cached
  res.set("CacheControl", "no-store");
  res.send("<h1>About Page</h1>");
});

//add basic middleware
app.use(helmet()); // I will need to configure helmet more

const options = {
  cert: fs.readFileSync(path.join(__dirname, "./openssl/certificate.pem")),
  key: fs.readFileSync(path.join(__dirname, "./openssl/private-key.pem")),
};

//create the server with options for securing the https connection.
try {
  https.createServer(options, app).listen(3000, () => {
    console.log("https server running on port 3000");
    connectToDB();
  });
} catch (err) {
  console.error(err);
}

//mongodb connection
async function connectToDB() {
  try {
    await mongoose.connect(
      process.env.DB_URL + "/" + process.env.DATABASE_NAME
    );
    console.log("connected to mongodb");
  } catch (err) {
    console.log("error connecting to MongoDB");
  }
}
