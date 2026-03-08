const {Router} = require("express");
const authMiddleware = require("../middleware/auth.middleware")
const authController = require('../controllers/auth.controller')
const router = Router();


router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.get('/get-me',authMiddleware.authUserVerification, authController.getMe);
router.get('/logout',authMiddleware.authUserVerification,authController.logout)


module.exports = router;