require("dotenv").config();
const express = require('express');
const app = express();
const {router} = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors  = require("cors")
const passport = require('passport')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
require('./passport-config');
const userController = require('./controllers/Users')
const stat = require("./middlewares/status");

// console.log(process.env.PORT)
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/uploads', express.static('uploads'));

app.use(router);

// WERREN TESTING GOOGLE LOGIN 
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// parse application/json

app.use(cookieSession({
    name: 'talikasih-session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/failed", (req,res) => {res.send("authentication error")})

//google sign in
app.get('/good', isLoggedIn,stat.status, userController.googleRegister)

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req,res) => {
    req.session = null;
    req.logout();
    res.redirect('/hellow')
})

app.use(errorHandler);

app.listen(port, () => console.log("Listening on port " + port));