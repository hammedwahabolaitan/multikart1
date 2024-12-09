const express = require("express");
const bodyParser = require("body-parser");
const products =require('./products')
const userinfo =require('./userinfo')
const cors =require('cors')
const app = express();
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json())

app.use(cors());

app.use("/",products,userinfo)


app
.listen(5050);
