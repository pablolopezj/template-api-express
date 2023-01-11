import { Router } from "express";
import {
  userDelete,
  userPost,
  userPut,
  usersGet,
} from "../controllers/user.controller.js";

import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import {
  validaEmail,
  validRole,
  existeUsuarioById,
} from "../helpers/db-validators.js";

const router = Router();

router.get("/", usersGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    check("rol").custom(validRole),
    validarCampos,
  ],
  userPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Correo no valido").isEmail(),
    check("password", "Password debe tener más de seis letras").isLength({
      min: 6,
    }),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(validRole),
    check("correo").custom(validaEmail),

    validarCampos,
  ],
  userPost
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioById),
    validarCampos,
  ],
  userDelete
);

export { router };
