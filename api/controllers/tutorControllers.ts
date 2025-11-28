import { getDataFromFile, saveDataToFile } from "../fileService.js";
import type { Tutor } from "../models/tutorModel.js";

export const tutorController = {
  getTutores(): Tutor[] {
    try {
      const data = getDataFromFile();
      return data.tutors;
    } catch (error) {
      console.error("Erro ao obter tutores:", error);
      return [];
    }
  },

  getTutorById(id: number): Tutor | null {
    try {
      const data = getDataFromFile();
      const tutor = data.tutors.find((t) => t.id === id);
      return tutor || null;
    } catch (error) {
      console.error("Erro ao obter tutor por ID:", error);
      return null;
    }
  },

  createTutor(data: Omit<Tutor, "id">): Tutor | null {
    try {
      const dataFromFile = getDataFromFile();
      const newId =
        dataFromFile.tutors.length > 0
          ? Math.max(...dataFromFile.tutors.map((t) => t.id)) + 1
          : 1;

      const newTutor: Tutor = {
        id: newId,
        ...data,
      };

      dataFromFile.tutors.push(newTutor);
      saveDataToFile(dataFromFile);

      return newTutor;
    } catch (error) {
      console.error("Erro ao criar tutor:", error);
      return null;
    }
  },

  updateTutor(id: number, data: Partial<Tutor>): Tutor | null {
    try {
      const dataFromFile = getDataFromFile();
      const tutor = dataFromFile.tutors.find((t) => t.id === id);

      if (!tutor) return null;

      Object.assign(tutor, data);
      saveDataToFile(dataFromFile);

      return tutor;
    } catch (error) {
      console.error("Erro ao atualizar tutor:", error);
      return null;
    }
  },

  deleteTutor(id: number): boolean {
    try {
      const dataFromFile = getDataFromFile();
      const index = dataFromFile.tutors.findIndex((t) => t.id === id);

      if (index === -1) return false;

      dataFromFile.tutors.splice(index, 1);
      saveDataToFile(dataFromFile);

      return true;
    } catch (error) {
      console.error("Erro ao deletar tutor:", error);
      return false;
    }
  },
};
