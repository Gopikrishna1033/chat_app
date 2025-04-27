const express = require("express")
const { registerUser, authUser, allUsers } = require("../controllers/userControllers")
const { Protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/").post(registerUser)
 router.post("/login",authUser)
 router.route("/").get(Protect,allUsers)

module.exports = router