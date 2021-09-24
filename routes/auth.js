const express =  require("express")
const router = express.Router()

const  authController = require("./../controllers/authController")

// GET - Mostrar el formulario de creación del usuario
router.get("/signup", authController.createUser)


// POST - Enviar datos del formulario al servidor
router.post("/signup", authController.submitSignUpForm)


router.get("/login", authController.createLoginForm)

router.post("/login", authController.submitLoginForm)
module.exports = router;