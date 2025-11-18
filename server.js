// Express web server
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const session = require("express-session");
const { cookie } = require("express-validator");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

//PASSPORT
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const u = User.findById(id).lean();
    done(null, u);
  } catch (err) {
    console.log("Error in deserializeUser:", err);
    done(err, null);
  }
});

//STRAEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        console.log("Google profile id:", profile.id);
        const email =
          Array.isArray(profile.emails) && profile.emails[0]
            ? profile.emails[0].value
            : "";
        let user = await User.findOne({
          provider: "google",
          providerId: profile.id,
        });
        if (!user) {
          console.log("Creating new user...");
          user = await User.create({
            provider: "google",
            providerId: profile.id,
            email: email || "no-email@example.com",
          });
        }
        return done(null, user);
      } catch (e) {
        return done(e, null);
      }
    }
  )
);

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

//Detect Errors didn't cath for try catch
process.on("uncaughtExceptiob", (err, origib) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        "Database is listening and node Running at port " +
          (process.env.PORT || 3000)
      );
    });
  })
  .catch((err) => {
    console.log("Error conecting Mongoose", err);
  });
