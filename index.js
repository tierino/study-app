const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

require("./models/User");
require("./models/Post");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ type: "*/*" }));

// Call routing functions with 'app' object
require("./routes/authRoutes")(app);
require("./routes/followRoutes")(app);
require("./routes/settingsRoutes")(app);
require("./routes/postRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log("Listening on port", PORT);
