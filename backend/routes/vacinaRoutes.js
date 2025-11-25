import express from "express";
import { listarVacinas, criarVacina, atualizarVacina, deletarVacina } from "../controllers/vacinaController.js";

const router = express.Router();

router.get("/", listarVacinas);
router.post("/", criarVacina);
router.put("/:id", atualizarVacina);
router.delete("/:id", deletarVacina);

export default router;
