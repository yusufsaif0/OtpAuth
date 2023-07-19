const express = require('express')
const app = express()
const cors = require('cors')
const conn = require('./connection/conn')
const api= require("./routes")
const config =require( "dotenv");

const Razorpay = require('razorpay'); 
exports.instance = new Razorpay({
  
    key_id: "rzp_test_fiIwmRET6CApc2",
  
    key_secret: "YAEUthsup8SijNs3iveeVlL1"
});
const jwt = require('jsonwebtoken')

const path = require('path')
//const cron = require('node-cron')
var appRoot = require('app-root-path');
const router =express.Router();
app.use(cors())
app.use(express.json())
app.use('/api',api)
app.use(express.static(__dirname + '/public'));
app.use("/public", express.static(path.join(__dirname, 'public')));
// config({ path: "./config/config.env" });

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const port = process.env.PORT || 4000

if(process.env.NODE_ENV=="production")
{
    app.use(express.static("frontend/build"))
}

  
app.get('*', (req, res) => {
//res.sendFile(path.resolve(__dirname, '../client/', 'build', 'index.html'));
});
app.listen(port)