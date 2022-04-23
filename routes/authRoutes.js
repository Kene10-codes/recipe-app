const { Router } = require("express")
const authContollers = require("../controllers/authControllers")

const router = Router()

router.get("/signup", authContollers.signup_get)
router.post("/signup", authContollers.signup_post)
router.get("/login", authContollers.login_get)
router.post("/login", authContollers.login_post)
router.get("/logout", authContollers.logout_get)


module.exports = router