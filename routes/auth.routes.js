import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { googleSignIn, login } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contrasenuia es obligatiria").not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "idToken de google es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);

export { router };
