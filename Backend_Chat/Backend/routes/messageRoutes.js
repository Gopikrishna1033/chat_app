const express = require("express");
const { Protect } = require("../middleware/authMiddleware");
const { sendMessages, allMessages } = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(Protect, sendMessages);
router.route("/:chatId").get(Protect,allMessages)

module.exports = router;
