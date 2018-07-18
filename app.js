var express               = require('express');
var mongoose              = require('mongoose');
var passport              = require('passport');
var bodyParser            = require('body-parser');
var LocalStrategy         = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User                  = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo_app');


var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
  secret: 'Petka is my cat',
  resave: false,
  saveUninitialized: false  
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==========================
// ROUTES
// ==========================

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});


// Auth Routes

//  show signup form
app.get('/register', (req, res) => {
  res.render('register');
});
//  handling user sign up
app.post('/register', (req, res) => {
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/secret');
    });
  });
});

app.listen('3000', () =>{
  console.log('Server running on port 3000!');
});