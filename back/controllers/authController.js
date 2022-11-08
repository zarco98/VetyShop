const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");

//Registrar un nuevo usuario /api/usuario/registro

exports.registroUsuario = catchAsyncErrors(async (req, res, next) => {
    const { nombre, email, password } = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar: {
            public_id: "ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })
})

//Iniciar Sesión - Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Revisar si los campos están completos
    if (!email || !password) {
        return next(new ErrorHandler("Por favor ingrese Email & Contraseña", 400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Correo o contraseña inválidos"), 401)
    }

    //Comparar contraseñas, verificar si está bien
    const contraseñaOK = await user.compararPass(password);

    if (!contraseñaOK) {
        return next(new ErrorHandler("Contraseña inválida"), 401)
    }
    tokenEnviado(user, 200, res)

})