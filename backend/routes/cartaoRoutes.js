import express from "express";
import * as RegistroController from "../controllers/registroController.js";

const router = express.Router();

// Retorna todos os registros de um cartão específico
router.get("/:cartaoId", RegistroController.listarRegistrosPorCartao);

export default router;
