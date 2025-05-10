const express = require("express")
const router = express.Router()
const {Protect} = require("../middleware/authMiddleware")
const { accessChat } = require("../controllers/chatControllers")

router.route("/").post(Protect,accessChat)
// router.route("/").get(Protect,fetchChat)
// router.route("/group").post(Protect,createGroupChat)
// router.route("/group/rename").put(Protect,renameGroupChat)
// router.route("/group/remove/user").put(Protect,removeGroupMember)
// router.route("/group/add/user").put(Protect,addGroupMember)
// router.route("/group/delete/chat").delete(Protect,deleteGroupChat)

module.exports = router