import { Router } from "express";
import { buscar } from "../controllers/buscar.controller.js";

const router = Router();

router.get("/:coleccion/:termino", buscar);

export { router };
