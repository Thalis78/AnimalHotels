import type { VercelRequest, VercelResponse } from "@vercel/node";
import { animalController } from "../../controllers/animalControllers.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res
      .status(400)
      .json({ error: "ID do animal não fornecido ou inválido" });
  }

  try {
    if (method === "PUT") {
      const updatedAnimal = await animalController.updateAnimal(
        Number(id),
        req.body
      );
      if (!updatedAnimal) {
        return res.status(404).json({ error: "Animal não encontrado" });
      }
      return res.status(200).json(updatedAnimal);
    }

    if (method === "DELETE") {
      const deleted = await animalController.deleteAnimal(Number(id));
      if (!deleted) {
        return res.status(404).json({ error: "Animal não encontrado" });
      }
      return res.status(204).send(null);
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (error) {
    console.error("Erro no handler da API:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
