const bcryptjs = require("bcryptjs")
const app = require("../app")
const saltRounds = 10
const User = require("./../models/User.model")

exports.createUser = async(req, res) => {
  
    res.render("auth/signup")

}

exports.submitSignUpForm = async(req, res) => {
       // 1. OBTENER LOS DATOS DEL FORMULARIO
    const {username, email, password} = req.body
    console.log(req.body)
     // 2. ENCRIPTACIÓN DE LA VARIABLE PASSWORD
     const salt = await bcryptjs.genSalt(saltRounds)
    // ESTE ES LA BASE DE LA ENCRIPTACION
    // $2a$10$H9jg8k0zOgo8346atEKSwu
       // MEZCLA DEL PASSWORD CON NUESTRA SALT
    // ESTE PASSWORD NO PUEDE SER REVERSIBLE
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = await User.create({
        username,
        email,
        passwordHash: hashedPassword,
    });
    res.redirect("/")//REDIRECT PARA NO ENCIMAR
};


exports.createLoginForm = async(req, res, next) => {//si la funcion es middleware, usa next, si no es middleware no es necesario
    res.render("auth/login")
}

exports.submitLoginForm = async(req, res) =>{
        // 1. OBTENER LOS DATOS DEL FORMULARIO
        const {username, email, password} = req.body



            // 2. REALIZAR UNA VALIDACIÓN DE QUE NO HAYA DATOS VACÍOS
        if(!username || !username.length || !password || !password.length)
        return res.render("auth/login", {
            errorMessage: "tiene campos vacios, hay que llenarlos"
        })
        
        
            // 3. SI TODO BIEN, ENTONCES.... BUSQUEMOS AL USUARIO EN BASE DE DATOS
            const foundUser = await User.findOne({username})
 

            if(!foundUser){
                return res.render("auth/login", {
                    errorMessage: "el usuario o password son erroneos"
                })
            }
           
            //bcrypt encripta la conteraseña   //comprareSync compara la password el usuario vs la registrada en el sistema
            const isItMatch = await bcryptjs.compareSync (password, foundUser.passwordHash);
            console.log(isItMatch)
            if(!isItMatch){
                return res.render("auth/login",{
                    errorMessage: "la pass es incorrecta. intenta de nuez"
                })

            }

           
            req.session.currentUser=foundUser
            res.redirect("/")

        //SI COINCIDEN, Manda este error
        
      
    
}