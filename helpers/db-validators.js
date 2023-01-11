import { Role } from "../models/role.js";
import { Usuario } from "../models/user.js";

const validRole = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El rol ${rol} no es permitido`);
  }
};

const validaEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El email ${correo} ya existe`);
  }
};

const existeUsuarioById = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

export { validRole, validaEmail, existeUsuarioById };
