const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);
router.post('/google', userCtrl.loginUserByGoogle);
router.post('/facebook', userCtrl.loginUserByFacebook);

module.exports = router;
