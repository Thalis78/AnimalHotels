import type { VercelRequest, VercelResponse } from "@vercel/node";
import { tutorController } from "../controllers/tutorControllers.js";

export const validateLogin = async (email: string, senha: string) => {
  try {
    const tutors = await tutorController.getTutores();
    return tutors.find(
      (tutor) => tutor.email === email && tutor.senha === senha
    );
  } catch (err) {
    console.error("Erro ao validar login:", err);
    throw new Error("Erro ao tentar validar o login");
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  try {
    if (method === "GET") {
      const id = req.query.id ? Number(req.query.id) : null;

      if (id) {
        const tutor = await tutorController.getTutorById(id);
        if (!tutor) {
          return res.status(404).json({ error: "Tutor não encontrado" });
        }
        return res.status(200).json(tutor);
      }

      const tutors = await tutorController.getTutores();
      return res.status(200).json(tutors);
    }

    if (method === "POST") {
      const { nome, email, telefone, senha } = req.body;

      if (!nome || !email || !telefone || !senha) {
        return res.status(400).json({
          error: "Campos obrigatórios: nome, email, telefone e senha",
        });
      }

      const newTutor = await tutorController.createTutor({
        nome,
        email,
        telefone,
        senha,
      });

      return res.status(201).json(newTutor);
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    console.error("Erro no handler da API:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
