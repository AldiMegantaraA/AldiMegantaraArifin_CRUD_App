require('dotenv').config();

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
// const clearCache   = require('./server/services/redisCaching');
const app = express();
const PORT = process.env.PORT || 3000

const connectDB = require('./server/database/connection');

// ===== jwt ====
const jwt = require('jsonwebtoken');
app.use(express.json())


const posts = [
    {
        username: 'aldi megantara arifin',
        accountnumber: '123456',
        identitynumber: '111111'
    },
    {
        username: 'aldi megantara arifin kedua',
        accountnumber: '654321',
        identitynumber: '2222222'
    }
]

// ===== jwt ====

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    // Authenticate header
    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

dotenv.config({path:'config.env'})

app.use(morgan('tiny'));

// monggoDB connection
connectDB();

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on https://crudappaldimegantaraarifin.herokuapp.com:${PORT})}`)});