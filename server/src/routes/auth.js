//destructuramos la ruta
const { Router } = require("express")
const authRouter = Router()

//Importar el modelo del usuario, para guardar un usuario en la base de datos para consultar si este existe
const User = require('../models/User')

//token
const jwt = require('jsonwebtoken')


//aqui registraremos al usuario método POST
authRouter.post('/signup', async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({name, email})
    await newUser.save();

    const token = jwt.sign({_id: newUser._id }, 'secretKey')
    return res.status(200).json({token})
})


//LOGUEARSE

authRouter.post('/signin', async (req, res) => {
    const { name, email} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("The email doesn't exists");
    if(user.name !== name) return res.status(401).send("Wrong name");

    const token = jwt.sign({_id: user._id}, 'secretkey')
    return res.status(200).json({token})
});

//Obtener un arreglo de clientes registrados

authRouter.get('/private-clients', verifyToken, (req, res) => {
    res.json([
        {
            id: 1,
            name: 'Angie',
            email: 'angie@gmail.com'
        },
        {
            id: 2,
            name: 'Kathleen',
            email: 'kathleen@gmail.com'
        }
    ])
})

//esta funcion es para validar si existe el token o no

function verifyToken(req, res, next){
    //console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(401).send('Anuthorize request')
    }
    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Anuthorize request')
    }
    const payload = jwt.verify(token, 'secretkey')
   req.userId = payload._id
   next()
}



module.exports = authRouter

