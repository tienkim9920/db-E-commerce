require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fetch = require('node-fetch')

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
const auth = require('./api/controller/auth.controller')
const notification = require('./api/controller/notification.controller')
const address = require('./api/controller/address.controller')
const category = require('./api/controller/category.controller')
const checking = require('./api/controller/checking.controller')
const client = require('./api/controller/client.controller')
const comment = require('./api/controller/comment.controller')
const coup = require('./api/controller/coup.controller')
const coupon = require('./api/controller/coupon.controller')
const detail = require('./api/controller/detail.controller')
const distance = require('./api/controller/distance.controller')
const like = require('./api/controller/like.controller')
const message = require('./api/controller/message.controller')
const newfeed = require('./api/controller/newfeed.controller')
const note = require('./api/controller/note.controller')
const option = require('./api/controller/option.controller')
const order = require('./api/controller/order.controller')
const pay = require('./api/controller/pay.controller')
const product = require('./api/controller/product.controller')
const reputation = require('./api/controller/reputation.controller')
const room = require('./api/controller/room.controller')
const shop = require('./api/controller/shop.controller')
const tick = require('./api/controller/tick.controller')
const ticket = require('./api/controller/ticket.controller')
const user = require('./api/controller/user.controller')

app.use('/auth', auth)
app.use('/notification', notification)
app.use('/address', address)
app.use('/category', category)
app.use('/checking', checking)
app.use('/client', client)
app.use('/comment', comment)
app.use('/coup', coup)
app.use('/coupon', coupon)
app.use('/detail', detail)
app.use('/distance', distance)
app.use('/like', like)
app.use('/message', message)
app.use('/newfeed', newfeed)
app.use('/note', note)
app.use('/option', option)
app.use('/order', order)
app.use('/pay', pay)
app.use('/product', product)
app.use('/reputation', reputation)
app.use('/room', room)
app.use('/shop', shop)
app.use('/tick', tick)
app.use('/ticket', ticket)
app.use('/user', user)
// Import controller API

app.get('/tinh', async (req, res) => {
    const respond = await fetch('https://api.mysupership.vn/v1/partner/areas/province')
    const data = await respond.json()
    res.json(data)
})

app.get('/quan', async (req, res) => {
    const respond = await fetch(`https://api.mysupership.vn/v1/partner/areas/district?province=${req.query.code}`)
    const data = await respond.json()
    res.json(data)
})

app.get('/phuong', async (req, res) => {
    const respond = await fetch(`https://api.mysupership.vn/v1/partner/areas/commune?district=${req.query.code}`)
    const data = await respond.json()
    res.json(data)
})

let userOnline = []

io.on('connection', async (socket) => {
    console.log('a user connected', socket.id);

    // Tham gia vào giỏ hàng
    socket.on('joinCart', data => {
        console.log(`${socket.id} da tham gia phong ${data}`)
        socket.join(data)
    })

    // Xác nhận giao dịch
    socket.on('verifyCart', data => {
        socket.to(data.room).emit('verifyCart', data)
    })

    socket.on('joinChat', roomId => {
        socket.join(roomId)
    })

    // Gửi tin nhắn
    socket.on('sendMessage', data => {
        socket.to(data.roomId).emit('sendMessage', data)
    })

    // Gõ bàn phím
    socket.on('typing', data => {
        socket.to(data.roomId).emit('typing', data)
    })

    // connect application
    socket.on('connectApplication', (session) => {
        let flag = false

        userOnline.forEach(value => {
            if (value._id.includes(session)){
                flag = true
            }
        })

        if (flag){
            return
        }

        // Khi thêm vào nó sẽ tạo expiredTime vòng đời cho userId
        const data = {
            _id: session,
            expiredTime: Date.now() + 600000
        }

        userOnline.push(data)
        console.log(userOnline)
    })

    // getOnline list user online
    socket.on('getOnline', () => {
        socket.emit('getOnline', userOnline)
    })

    // expiredTime for userOnline
    setInterval(() => {
        
        const newClient = userOnline.filter(value => {
            return parseInt(value.expiredTime) > parseInt(Date.now())
        })

        userOnline = newClient

    }, 90000)
});
  
server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});