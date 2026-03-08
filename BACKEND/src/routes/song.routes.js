const {Router} = require("express");
const upload = require("../middleware/upload.middleware")
const songControllers = require("../controllers/song.controller")
const router = Router();



router.post('/',upload.single("song"),songControllers.uploadSong);
router.get('/',songControllers.getSong)

module.exports = router;