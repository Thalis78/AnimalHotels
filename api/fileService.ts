import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { Tutor } from "./models/tutorModel.js";
import { Animal } from "./models/animalModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "db.json");

console.log("Caminho do arquivo db.json:", filePath);

export const getDataFromFile = (): { tutors: Tutor[]; animais: Animal[] } => {
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      if (fileContent.trim() === "") {
        return { tutors: [], animais: [] };
      }
      return JSON.parse(fileContent);
    } catch (error) {
      console.error("Erro ao ler ou analisar db.json:", error);
      return { tutors: [], animais: [] };
    }
  } else {
    saveDataToFile({ tutors: [], animais: [] });
    return { tutors: [], animais: [] };
  }
};

export const saveDataToFile = (data: {
  tutors: Tutor[];
  animais: Animal[];
}) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Erro ao salvar dados em db.json:", error);
  }
};
