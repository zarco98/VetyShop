const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")

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
    tokenEnviado(user, 201, res)
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

//Cerrar Sesión
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expire: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
})

//Olvidé mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("Usuario no se encuentra registrado", 404))
    }
    const resetToken = user.genResetPasswordToken();

    await user.save({validateBeforeSave: false})

    //Crear una url para hacer el reset de la contraseña
    const resetUrl= `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

    const mensaje=`Tu link para ajustar una nueva contraseña es el 
    siguiente: n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunícate con soporte.\n\n Att:\nVetyshop Store`

    try{
        await sendEmail({
            email:user.email,
            subject: "VetyShop Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success:true,
            message: `Correo enviado a: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message, 500))
    }
})

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next)=>{
    //Hasg el token que llegó con la URL
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("El token es inválido o ya expiró", 400))
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Contraseñas no coinciden",400))
    }

    //Setear la nueva contraseña
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    tokenEnviado(user, 200, res)
})