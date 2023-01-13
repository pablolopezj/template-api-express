import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { esAdminRole, validarJWT } from "../middlewares/index.js";
import {
  crearProducto,
  deleteProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
} from "../controllers/productos.controller.js";
import { existeCategoria, existeProducto } from "../helpers/db-validators.js";

const router = Router();

// Obtener todos los productos - paginado
router.get("/", [validarJWT], getAllProductos);

//Obtener producto por id
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  getProductoById
);

//Obtener producto por id
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("categoria", "La categoria es requerida").not().isEmpty(),
    check("categoria", "Categoria no valida").isMongoId(),
    check("categoria").custom(existeCategoria),
    check("precio", "El precio debe ser numerico").isNumeric(),
    validarCampos,
  ],
  crearProducto
);

//Actualizar producto
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  updateProducto
);

//Delete producto
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  deleteProducto
);

export { router };
