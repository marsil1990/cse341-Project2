const routes = require("express").Router();
const passport = require("passport");

routes.get("/", (req, res) => {
  if (!req.user) {
    return res.status(200).send("Enter /login");
  }
  return res.status(200).send("Enter /logout");
});

routes.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

routes.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

module.exports = routes;
