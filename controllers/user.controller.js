import { response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models/user.js";

const usersGet = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const userPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, correo, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  res.json(usuario);
};
const userPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  //Encriptar la contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en DB
  usuario.save();

  res.json(usuario);
};
const userDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrado duro
  // const usuario = await Usuario.findByIdAndDelete(id);

  //Borrado suave
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json(usuario);
};

export { usersGet, userPut, userPost, userDelete };
