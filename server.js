// Express web server
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const app = express();

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

app.use("/", require("./routes/index"));

app.use((err, req, res, next) => {
  console.error(err.stack || err.message || err);
  res.status(500).json({ message: err.message || "Internal server error" });
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
