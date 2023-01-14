import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarImagen,
  actualizarImagenCloudinary,
  cargarArchivos,
  mostrarImage,
} from "../controllers/uploads.controller.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivoSubir } from "../middlewares/index.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post("/", [validarArchivoSubir], cargarArchivos);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe ser un id de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id debe ser un id de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImage
);

export { router };
