import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { esAdminRole, validarJWT } from "../middlewares/index.js";
import {
  crearCategoria,
  deleteCagtegoria,
  getAllCategories,
  getCategoriaById,
  updateCategoria,
} from "../controllers/categorias.controller.js";
import { existeCategoria } from "../helpers/db-validators.js";

const router = Router();
/**
 * {{url}}/api/catogiras
 */

// Obtener todas las categorias
router.get("/", [validarJWT], getAllCategories);

// Get category by id
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  getCategoriaById
);

// Crear categoria -- Cualquier usuario con token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Update category - cualquiera con token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  updateCategoria
);

// Delete category - solo como administrador
// Soft delete
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  deleteCagtegoria
);
export { router };
