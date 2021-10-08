require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 4000;

const cors = require("cors");
var upload = require('express-fileupload');

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tienkim9920:U4tQMg6Wfy8DaL@cluster0.rco6f.mongodb.net/E-commerce?retryWrites=true&w=majority")

app.use(cors());

app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import controller API
const authAPI = require('./api/controller/auth.controller')

app.use('/auth', authAPI)

app.get('/', (req, res) => {
    res.json("Thanh cong")
})

io.on('connection', async (socket) => {
    console.log('a user connected', socket.id);
});
  
server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});