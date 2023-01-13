import { response } from "express";
import { Categoria } from "../models/index.js";

//ObtenerCategorias - paginado - total -populate

const getAllCategories = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, categorias] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
        .populate("usuario", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      total,
      categorias,
    });
  } catch (error) {
    console.log(error);
  }
};

//ObtenerCategoria - populate

const getCategoriaById = async (req, res = response) => {
  const id = req.params.id;

  try {
    const categoria = await Categoria.findById(id).populate(
      "usuario",
      "nombre"
    );
    res.status(200).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(200).json(categoria);
};

//ActualizarCategoria
const updateCategoria = async (req, res = response) => {
  const id = req.params.id;
  const { nombre } = req.body;

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
      },
      { new: true }
    );
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
//Borrar categoria - estado a false

const deleteCagtegoria = async (req, res = response) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export {
  crearCategoria,
  getCategoriaById,
  getAllCategories,
  updateCategoria,
  deleteCagtegoria,
};
