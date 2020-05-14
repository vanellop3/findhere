const express = require('express');
const router = express.Router();
var user_Controller = require('../controllers/UserController');
const passport = require('passport');


router.route('/register').post(user_Controller.registerUser);

router.route('/login').post(user_Controller.loginUser);

//Get profile
router.route('/edit-profile/:id').get(user_Controller.editUser);

// Update Profile
router.route('/update-profile/:id').put(user_Controller.updateUser);

router.get('/me', passport.authenticate('jwt', {session: false}), user_Controller.authenticateMe);

module.exports = router;