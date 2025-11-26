import { Request, Response } from "express";
import { Tutor, readDB, writeDB } from "../models/tutorModel.ts";

export const getTutores = (req: Request, res: Response) => {
    const db = readDB();
    res.json(db.tutores);
};

export const createTutor = (req: Request, res: Response) => {
    const { nome, email, telefone } = req.body;
    if (!nome || !email || !telefone) return res.status(400).json({ error: "Campos obrigatórios" });

    const db = readDB();
    const newTutor: Tutor = { id: db.tutores.length + 1, nome, email, telefone };
    db.tutores.push(newTutor);
    writeDB(db);
    res.status(201).json(newTutor);
};

export const updateTutor = (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const db = readDB();
    const tutor = db.tutores.find(t => t.id === Number(id));
    if (!tutor) return res.status(404).json({ error: "Tutor não encontrado" });

    if (nome) tutor.nome = nome;
    if (email) tutor.email = email;
    if (telefone) tutor.telefone = telefone;

    writeDB(db);
    res.json(tutor);
};

export const deleteTutor = (req: Request, res: Response) => {
    const { id } = req.params;
    const db = readDB();
    const index = db.tutores.findIndex(t => t.id === Number(id));
    if (index === -1) return res.status(404).json({ error: "Tutor não encontrado" });

    db.tutores.splice(index, 1);
    writeDB(db);
    res.status(204).send();
};
