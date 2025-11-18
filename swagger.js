import swaggerAutogen from "swagger-autogen";

const outputFile = "swagger.json";
const endPointsFiles = ["./routes/index.js"];

const doc = {
  info: {
    title: "API - Contacts ",
    description:
      "This API allow us to get, create, update and delete football Players and football Teams",
  },
  // host: "localhost:3000",
  schemes: ["http", "https"],
  securityDefinitions: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "connect.sid",
      description:
        "Session cookie set after login in via /login (Google OAuth).",
    },
  },
};

swaggerAutogen()(outputFile, endPointsFiles, doc);
