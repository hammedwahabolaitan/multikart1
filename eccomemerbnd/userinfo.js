const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database"); // Assuming you have a database connection module
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const userinfo = express();
// const PORT = 5000;

// Middleware
userinfo.use(bodyParser.json());
userinfo.use(cors());

// Nodemailer configuration
const mymail = "olaitanwahabhammed@gmail.com";
const mypass = "mkwd obwu gogb shsf";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mymail,
    pass: mypass,
  },
});

// Function to send email
 function sendMail (to, subject, text) {
  const mailOptions = {
    from: mymail,
    to,
    subject,
    html: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
           return(false);
        }
        return(true);
      });
};


// User signup endpoint
userinfo.post("/signup", (req, res) => {
  const { fullname, username, phoneNumber, email, password } = req.body;

  if (!fullname || !email || !username || !phoneNumber || !password) {
    return res.status(400).send({ status: "Invalid input data" });
  }

  const checkUserQuery =
    "SELECT * FROM customerinfo WHERE username = ? OR email = ?";
  database.query(checkUserQuery, [username, email], (err, results) => {
    if (err) {
      return res.status(500).send({ status: "Database error", error: err });
    }

    if (results.length === 0) {
      const insertQuery =
        "INSERT INTO customerinfo (fullname, username, phonenumber, email, password) VALUES (?, ?, ?, ?, ?)";
      database.query(
        insertQuery,
        [fullname, username, phoneNumber, email, password],
        async (err, result) => {
          if (err) {
            return res.status(500).send({ status: "Database error", error: err });
          }

          const htmlContent =
            "<h1>Welcome to our website</h1><p>You have successfully registered on our platform.</p>";


         const mail =  sendMail(email, "Registration Successful", htmlContent);

          res.status(200).send({
            status: "success",
            message: "User created successfully",
            userId: result.insertId,
          });
        }
      );
    } else {
      res.status(409).send({ status:"fail",message: "User already exists"});
    }
  });
});

// User login endpoint
userinfo.post("/login", (req, res) => {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).send({ status: "Invalid input data" });
  }

  const loginQuery =
    "SELECT * FROM customerinfo WHERE username = ? AND password = ?";
  database.query(loginQuery, [username, password], (err, results) => {
    if (err) {
      return res.status(500).send({ status: "fail", error: err });
    }

    if (results.length === 0) {
      return res.status(401).send({ status:'success' ,message:"Invalid credentials" });
    }else{
      
          const token= jwt.sign({user:username,pass:password},"wabham", {expiresIn:"1h"})
      
          res.status(200).send({
            status: "success",
            message:"Login successful",
            // user: results[0],
            token:token
          });
      
    }
  });
});
module.exports =userinfo