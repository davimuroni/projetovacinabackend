import express from "express";
import {
  listarFuncionarios,
  listarFuncionarioPorId,
  criarFuncionario,
  atualizarFuncionario,
  deletarFuncionario
} from "../controllers/funcionarioController.js";

const router = express.Router();

router.get("/", listarFuncionarios);
router.get("/:id", listarFuncionarioPorId);
router.post("/", criarFuncionario);
router.put("/:id", atualizarFuncionario);
router.delete("/:id", deletarFuncionario);

export default router;
