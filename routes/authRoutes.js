const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile);
router.post('/logout', authController.logout);      
router.put('/profile', authMiddleware, authController.updateProfile);
router.post('/logout', authController.logout);


module.exports = router;
