import { Role } from "../models/role.js";
import { Usuario, Categoria, Producto } from "../models/index.js";

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

const existeCategoria = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`La categoria con id ${id} no existe`);
  }
};

const existeProducto = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El prdocuto con id ${id} no existe`);
  }
};

export {
  validRole,
  validaEmail,
  existeUsuarioById,
  existeCategoria,
  existeProducto,
};
