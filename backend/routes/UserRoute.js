const express = require('express');
const { signup, login, getuser, edituser, sendmessage } = require('../controllers/UserController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/getuser/:id', getuser);
router.put('/edituser/:id', edituser);
router.post('/sendmessage/:id', sendmessage);

module.exports = router;