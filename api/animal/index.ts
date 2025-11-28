import type { VercelRequest, VercelResponse } from "@vercel/node";
import { animalController } from "../controllers/animalControllers.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  try {
    if (method === "GET") {
      const tutorId = Number(req.query.tutor);

      if (tutorId) {
        const animaisPorTutor = animalController.getAnimaisPorTutor(tutorId);
        return res.status(200).json(animaisPorTutor);
      }

      return res.status(200).json(animalController.getAnimais());
    }

    if (method === "POST") {
      const { nome, especie, raca, idade, tutor } = req.body;

      if (!nome || !especie || !raca || !idade || !tutor) {
        return res.status(400).json({ error: "Campos obrigatórios" });
      }

      const newAnimal = animalController.createAnimal({
        nome,
        especie,
        raca,
        idade,
        tutor,
      });

      if (!newAnimal)
        return res.status(404).json({ error: "Tutor não encontrado" });

      return res.status(201).json(newAnimal);
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    console.error("Erro no handler da API:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
