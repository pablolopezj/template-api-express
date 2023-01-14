import path from "path";
import fs from "fs";
import * as cloudinary from "cloudinary";
import { response } from "express";
import { subirArchivo } from "../helpers/index.js";
import { Producto } from "../models/producto.js";
import { Usuario } from "../models/user.js";

cloudinary.config({
  cloud_name: "dpyktzdfr",
  api_key: "331469911321954",
  api_secret: "kA2fOsuifyI23pqU-DPTkGvvOjc",
  secure: true,
});

const cargarArchivos = async (req, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe el usuario con id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe el producto con id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "upps!!! somethig went wrong" });
  }

  // Limpiar imagenes previas
  const __dirname = path.resolve();

  if (modelo.img) {
    //Borrar la imagen del servidor
    const pathImage = path.join(__dirname, "./uploads", coleccion, modelo.img);

    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe el usuario con id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe el producto con id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "upps!!! somethig went wrong" });
  }

  // Limpiar imagenes previas
  // const __dirname = path.resolve();

  if (modelo.img) {
    //Borrar la imagen del servidor
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    return res.json(modelo);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ msg: "ups! somethig whent wrong" });
  }
};

const mostrarImage = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe el usuario con id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe el producto con id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "upps!!! somethig went wrong" });
  }

  // Limpiar imagenes previas
  const __dirname = path.resolve();

  if (modelo.img) {
    //Borrar la imagen del servidor
    const pathImage = path.join(__dirname, "./uploads", coleccion, modelo.img);

    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }
  const pathImageDefault = path.join(
    __dirname,
    "./uploads/default/no-image.jpg"
  );
  res.sendFile(pathImageDefault);
};

export {
  cargarArchivos,
  actualizarImagen,
  mostrarImage,
  actualizarImagenCloudinary,
};
