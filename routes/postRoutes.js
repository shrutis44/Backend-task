const express = require('express');
const authController = require('../controllers/authController'); 
const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.profile);
router.post('/logout', authController.logout);
router.post('/create', authMiddleware, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);




module.exports = router;
