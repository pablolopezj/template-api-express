import { response } from "express";
import { Producto } from "../models/index.js";

//Obtener categorias total - paginado
const getAllProductos = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  try {
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre")
        .skip(Number(desde))
        .limit(Number(limite)),
    ]);

    res.json({
      total,
      productos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "ups!! something went wrong",
    });
  }
};

const getProductoById = async (req, res = response) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findById(id)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "ups!! something went wrong",
    });
  }
};

//Crear producto
const crearProducto = async (req, res = response) => {
  const { nombre, precio, categoria, dscripcion, disponible } = req.body;

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `Producto ${productoDB.nombre}, ya existe`,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre: nombre.toUpperCase(),
    usuario: req.usuario._id,
    precio,
    categoria,
    dscripcion,
    disponible,
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(200).json(producto);
};

// Actualizar producto
const updateProducto = async (req, res = response) => {
  const { id } = req.params;
  const { nombre, precio, categoria, descripcion, disponible } = req.body;

  try {
    const producto = await Producto.findByIdAndUpdate(
      id,
      {
        nombre: nombre?.toUpperCase(),
        usuario: req.usuario._id,
        precio,
        categoria,
        descripcion,
        disponible,
      },
      { new: true }
    )
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");

    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "ups!! something went wrong",
    });
  }
};

const deleteProducto = async (req, res = response) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "ups!! something went wrong",
    });
  }
};
export {
  crearProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};
