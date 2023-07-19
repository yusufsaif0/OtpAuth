const express = require('express')

const router = express.Router();

const {registerUser,login,activateAccount } = require('./controller/auctionController');

router.post('/register', registerUser)
router.post('/login', login)
router.post('/activateAccount/:user',activateAccount)
module.exports = router
