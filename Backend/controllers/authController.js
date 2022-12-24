const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path : "variables.env"});


exports.autenticarUsuario = async (req, res) => {

    const { password , email } = req.body;

    try{

        //Confirmar que el email está en la base de datos
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(404).json({msg:"el usuario no existe"});
        }
        //Confirmar que el password es el correcto
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passwordCorrecto){
            return res.status(400).json({ msg: "password incorrecto"});
        }
        
        // Si todo está bien, se crea un token

        const payload = {
            usuario: { id: usuario.id},
        };
        
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: '30d',//30 dias
            },
            (error, token ) =>{
                if (error) throw error;
                // Mensaje de confirmacion
                res.json({ token});
            }
        );

    }catch(error){
        console.log(error);
    }
}

exports.usuarioAutenticado = async ( req, res) => {
    try{
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario });
    }catch(error){
        res.status(500).json({ msg: "Hubo un error"});
    }
}