import type { Request, Response } from "express";
import { tutorController } from "./controllers/tutorControllers.ts";

export default function tutorHandler(req: Request, res: Response) {
  const method = req.method;

  if (method === "GET")
    return res.status(200).json(tutorController.getTutores());
  if (method === "POST") {
    const { nome, email, telefone } = req.body;
    if (!nome || !email || !telefone)
      return res.status(400).json({ error: "Campos obrigatórios" });
    const newTutor = tutorController.createTutor({ nome, email, telefone });
    return res.status(201).json(newTutor);
  }
  if (method === "PUT") {
    const id = Number(req.query.id);
    const tutor = tutorController.updateTutor(id, req.body);
    if (!tutor) return res.status(404).json({ error: "Tutor não encontrado" });
    return res.status(200).json(tutor);
  }
  if (method === "DELETE") {
    const id = Number(req.query.id);
    const ok = tutorController.deleteTutor(id);
    if (!ok) return res.status(404).json({ error: "Tutor não encontrado" });
    return res.status(204).send();
  }

  return res.status(405).json({ error: "Método não permitido" });
}
