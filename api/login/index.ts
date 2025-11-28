import type { VercelRequest, VercelResponse } from "@vercel/node";
import { validateLogin } from "../tutor/index.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "LucasThalisson";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  try {
    if (method === "POST") {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios: email e senha" });
      }

      const tutor = await validateLogin(email, senha);

      if (!tutor) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const payload = {
        id: tutor.id,
        message: "Login bem-sucedido",
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return res.status(200).json({
        message: "Login bem-sucedido",
        id: tutor.id,
        token,
      });
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (err) {
    console.error("Erro no handler de login:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
