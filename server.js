const express = require("express");
const https = require("https");
const app = express();
const fs = require("fs");
const path = require("path");

const helmet = require("helmet");

//default route/home page
app.get("/", (req, res) => {
  console.log("app default route");
  res.send("<h1>Default Route</h1>");
});
//add four more routes with a specific app in mind

//add basic middleware
app.use(helmet()); // I will need to configure helmet more

//add a password here?, why would i need to?
const options = {
  cert: fs.readFileSync(path.join(__dirname, "./openssl/certificate.pem")),
  key: fs.readFileSync(path.join(__dirname, "./openssl/private-key.pem")),
};

//working.
//create the server with options for securing the https connection.
try {
  https.createServer(options, app).listen(3000, () => {
    console.log("https server running on port 3000");
  });
} catch (err) {
  console.error(err);
}
