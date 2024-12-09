// const express = require("express");
// const multer = require("multer");
// const database = require("../config/database");

// const document = express.Router();

// // File Upload Configuration
// const storageConfig = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storageConfig });

// // Update Document
// document.post('/edit', (req, res) => {
//   const { postid, author, title, content } = req.body;

//   if (!postid || !author || !title || !content) {
//     return res.status(400).send({ status: "Invalid input data" });
//   }

//   const query = "UPDATE document SET author = ?, content = ?, title = ? WHERE id = ?";
//   database.query(query, [author, content, title, postid], (err, result) => {
//     if (err) {
//       return res.status(500).send({ status: "Database error", error: err });
//     }
//     res.send({
//       status: result.affectedRows ? "Updated successfully" : "Not updated",
//     });
//   });
// });

// // Retrieve All Documents
// // document.get("/interface", (req, res) => {
// //   // var token = req.headers
// //   console.log("token"); 
  
// //   database.query("SELECT * FROM document", (err, result) => {
// //     if (err) {
// //       return res.status(500).send({ status: "Database error", error: err });
// //     }
// //     res.send({ status: "success", result });
// //   });
// // });

// // Add Document
// document.post("/input", upload.single("image"), (req, res) => {
//   const { title, content, author } = req.body;
//   const image = req.file ? `http://localhost:2020/${req.file.filename}` : null;

//   if (!title || !content || !author) {
//     return res.status(400).send({ status: "Fill all the values" });
//   }

//   database.query(
//     "INSERT INTO document (title, content, author, imageName) VALUES (?, ?, ?, ?)",
//     [title, content, author, image],
//     (err, result) => {
//       if (err) {
//         return res.status(500).send({ status: "Database error", error: err });
//       }
//       res.send({
//         status: result.insertId ? "Added successfully" : "Not successfully",
//       });
//     }
//   );
// });

// // Delete Document
// document.get("/delete/:postid", (req, res) => {
//   const { postid } = req.params;

//   database.query("DELETE FROM document WHERE id = ?", [postid], (err, result) => {
//     if (err) {
//       return res.status(500).send({ status: "Database error", error: err });
//     }
//     res.send({
//       status: result.affectedRows ? "Deleted successfully" : "Not found",
//     });
//   });
// });

// // Retrieve Document by ID
// document.get("/selectid/:postid", (req, res) => {
//   const { postid } = req.params;

//   database.query("SELECT * FROM document WHERE id = ?", [postid], (err, result) => {
//     if (err) {
//       return res.status(500).send({ status: "Database error", error: err });
//     }
//     res.send({ status: "success", result });
//   });
// });

// module.exports = document;
