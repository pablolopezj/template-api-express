import { request, response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/user.js";

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la ptetición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //Leer el usuario correspondiente al uid
    const usuario = await Usuario.findById(uid);

    //Validar que el usuario exista
    if(!usuario){
      return res.status(401).json({
        msg: "Token no válido -usuario no existe",
      });
    }

    //Verificar que l usuario no esté marcado como eliminado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido -usuario con estado en false",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export { validarJWT };
