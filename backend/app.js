import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import funcionarioRoutes from "./routes/funcionarioRoutes.js";
import vacinaRoutes from "./routes/vacinaRoutes.js";
import registroRoutes from "./routes/registroRoutes.js";
import cartaoRoutes from "./routes/cartaoRoutes.js";

const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir frontend
const frontendPath = path.resolve("C:/Users/Pc/Desktop/projetovacinabackend/frontend");
app.use(express.static(frontendPath));

// Servir páginas HTML da pasta "pages"
app.use("/pages", express.static(path.join(frontendPath, "pages")));

// Rota raiz
app.get("/", (req, res) => res.sendFile(path.join(frontendPath, "index.html")));

// Rotas backend
app.use("/funcionarios", funcionarioRoutes);
app.use("/vacinas", vacinaRoutes);
app.use("/registros", registroRoutes);
app.use("/cartoes", cartaoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
