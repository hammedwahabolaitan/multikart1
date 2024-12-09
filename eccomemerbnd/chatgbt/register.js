const express = require("express");
const database = require("../config/database");

const register = express.Router();

// User Signup
register.post("/signup", (req, res) => {
  const { email, username, phoneNumber, password } = req.body;

  if (!email || !username || !phoneNumber || !password) {
    return res.status(400).send({ status: "Invalid input data" });
  }

  const query = "INSERT INTO registration (email, username, phone, password) VALUES (?, ?, ?, ?)";
  database.query(query, [email, username, phoneNumber, password], (err, result) => {
    if (err) {
      return res.status(500).send({ status: "Database error", error: err });
    }
    res.send({
      status: result.insertId ? "Added successfully" : "Not successfully",
    });
  });
});

// User Login
register.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ status: "Invalid input data" });
  }

  const query = "SELECT * FROM registration WHERE email = ? AND password = ?";
  database.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send({ status: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(401).send({ status: "Invalid credentials" });
    }

    res.send({ status: "Login successful", result });
  });
});

module.exports = register;








// google 



// const express = require("express");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const jwt = require("jsonwebtoken");
// const database = require("./database");

// const app = express();
// const register = express.Router();

// // Google OAuth Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const email = profile.emails[0].value;

//       // Check or save user in database
//       const query = "SELECT * FROM registration WHERE email = ?";
//       database.query(query, [email], (err, result) => {
//         if (err) return done(err, null);

//         if (result.length === 0) {
//           const insertQuery = "INSERT INTO registration (email, username) VALUES (?, ?)";
//           database.query(insertQuery, [email, profile.displayName], (err, newResult) => {
//             if (err) return done(err, null);
//             done(null, { id: newResult.insertId, email, username: profile.displayName });
//           });
//         } else {
//           done(null, result[0]);
//         }
//       });
//     }
//   )
// );

// app.use(passport.initialize());

// register.post("/auth/google", passport.authenticate("google-token"), (req, res) => {
//   const user = req.user;

//   const token = jwt.sign({ id: user.id, email: user.email }, "secret-key", { expiresIn: "1h" });
//   res.json({ status: "Login successful", token, result: user });
// });

// module.exports = register;













// const express = require("express");
// const passport = require("passport");
// const session = require("express-session");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const GitHubStrategy = require("passport-github").Strategy;
// const database = require("./database");

// const app = express();
// const PORT = 2020;

// // Middleware
// app.use(express.json());
// app.use(
//   session({
//     secret: "your_secret_key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Serialization
// passport.serializeUser((user, done) => {
//   done(null, user.id || user.email);
// });

// passport.deserializeUser((id, done) => {
//   database.query(
//     "SELECT * FROM registration WHERE id = ? OR email = ?",
//     [id, id],
//     (err, result) => {
//       if (err) return done(err);
//       done(null, result[0]);
//     }
//   );
// });

// // Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: "YOUR_GOOGLE_CLIENT_ID",
//       clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
//       callbackURL: "http://localhost:2020/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const { email, name } = profile._json;
//       database.query(
//         "INSERT INTO registration (email, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username = ?",
//         [email, name, name],
//         (err, result) => {
//           if (err) return done(err);
//           done(null, { email, name });
//         }
//       );
//     }
//   )
// );

// // Facebook Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "YOUR_FACEBOOK_APP_ID",
//       clientSecret: "YOUR_FACEBOOK_APP_SECRET",
//       callbackURL: "http://localhost:2020/auth/facebook/callback",
//       profileFields: ["id", "emails", "name"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const email = profile.emails[0].value;
//       const name = `${profile.name.givenName} ${profile.name.familyName}`;
//       database.query(
//         "INSERT INTO registration (email, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username = ?",
//         [email, name, name],
//         (err, result) => {
//           if (err) return done(err);
//           done(null, { email, name });
//         }
//       );
//     }
//   )
// );

// // GitHub Strategy
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: "YOUR_GITHUB_CLIENT_ID",
//       clientSecret: "YOUR_GITHUB_CLIENT_SECRET",
//       callbackURL: "http://localhost:2020/auth/github/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       const email = profile.emails[0].value;
//       const name = profile.displayName;
//       database.query(
//         "INSERT INTO registration (email, username) VALUES (?, ?) ON DUPLICATE KEY UPDATE username = ?",
//         [email, name, name],
//         (err, result) => {
//           if (err) return done(err);
//           done(null, { email, name });
//         }
//       );
//     }
//   )
// );

// // Routes
// app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
// app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
//   res.redirect("/");
// });

// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => {
//   res.redirect("/");
// });

// app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
// app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
//   res.redirect("/");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });