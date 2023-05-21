const express = require("express");
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const router = express.Router()


const controller = require('../controllers/queryController');
const authController = require('../controllers/authController');
const SECRET = require('../config/auth').config.secret;


const passportOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
};

router.use(passport.initialize());
router.use(passport.session());

passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
  const expirationDate = new Date(jwtPayload.exp * 1000);
  if (expirationDate < new Date()) {
    return done(null, false);
  }
  done(null, jwtPayload);
}))

passport.serializeUser(function (user, done) {
  done(null, user.username)
});

router.use((req, res, next) => {
  console.log("api route");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/login', authController.login)

router.post('/logout', authController.logout)

router.post('/refresh', authController.refresh)

router.get('/getAllProducts/:productId', controller.getAllProducts);

router.get('/getProductCategory', controller.getProductCategory);

router.get('/getBlogs/:isHotBlogs', controller.getBlogs);


module.exports = router