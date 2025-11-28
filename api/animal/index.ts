import type { VercelRequest, VercelResponse } from "@vercel/node";
import { animalController } from "./controllers/animalControllers.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const method = req.method;

    if (method === "GET") {
        return res.status(200).json(animalController.getAnimais());
    }

    if (method === "POST") {
        const { nome, especie, raca, idade, tutor } = req.body;

        if (!nome || !especie || !raca || !idade || !tutor) {
            return res.status(400).json({ error: "Campos obrigatórios"});
        }

        const newAnimal = animalController.createAnimal({ nome, especie, raca, idade, tutor });

        if (!newAnimal) return res.status(404).json( { error: "Tutor não encontrado" });

        return res.status(201).json(newAnimal);
    }

    if (method === "PUT") {
        const id = Number(req.query.id);
        const animal = animalController.updateAnimal(id, req.body);

        if (!animal) return res.status(404).json( { error: "Animal ou tutor não encontrado" });

        return res.status(200).json(animal);
    }

    if (method === "DELETE") {
        const id = Number(req.query.id);
        const ok = animalController.deleteAnimal(id);

        if (!ok) return res.status(404).json({ error: "Animal não encontrado" });

        return res.status(204).send("No content");
    }

    return res.status(405).json({ error: "Método não permitido" });
};
