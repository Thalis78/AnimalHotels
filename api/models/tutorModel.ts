import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export type Tutor = {
    id: number;
    nome: string;
    email: string;
    telefone: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../db/database.json");

export const readDB = (): { tutores: Tutor[] } => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ tutores: [] }, null, 2));
    }
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw);
};

export const writeDB = (data: { tutores: Tutor[] }) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Database updated successfully.");
};
