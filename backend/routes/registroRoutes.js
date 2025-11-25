import express from "express";
import * as RegistroController from "../controllers/registroController.js";

const router = express.Router();

// Rotas
router.get("/", RegistroController.listarRegistros);
router.post("/", RegistroController.criarRegistro);
router.get("/:cartaoId", RegistroController.listarRegistrosPorCartao);

export default router;
