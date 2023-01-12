import { response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models/user.js";
import { generaJWT } from "../helpers/generar-jwt.js";

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / password no son validos -corrreo",
      });
    }
    //verificar si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / password no son validos -estado: false",
      });
    }

    // varigicar la contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / password no son validos -password",
      });
    }

    // generar el JWT
    const token = await generaJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error",
    });
  }
};

export { login };
