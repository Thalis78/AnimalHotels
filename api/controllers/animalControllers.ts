import { getDataFromFile, saveDataToFile } from "../fileService.js";
import type { Animal } from "../models/animalModel.js";

export const animalController = {
  getAnimais(): Animal[] {
    try {
      const data = getDataFromFile();
      return data.animais;
    } catch (error) {
      console.error("Erro ao obter animais:", error);
      return [];
    }
  },

  getAnimaisPorTutor(tutorId: number): Animal[] {
    try {
      const data = getDataFromFile();
      return data.animais.filter((animal) => animal.tutor === tutorId);
    } catch (error) {
      console.error("Erro ao obter animais por tutor:", error);
      return [];
    }
  },

  getAnimalById(id: number): Animal | null {
      try {
        const data = getDataFromFile();
        const animal = data.animais.find((a) => a.id === id);
        return animal || null;
      } catch (error) {
        console.error("Erro ao obter animal por ID:", error);
        return null;
      }
    },

  createAnimal(data: Omit<Animal, "id">): Animal | null {
    try {
      const dataFromFile = getDataFromFile();

      const tutor = dataFromFile.tutors.find((t) => t.id === data.tutor);
      if (!tutor) return null;

      const newId =
        dataFromFile.animais.length > 0
          ? Math.max(...dataFromFile.animais.map((a) => a.id)) + 1
          : 1;

      const newAnimal: Animal = {
        id: newId,
        ...data,
      };

      dataFromFile.animais.push(newAnimal);

      saveDataToFile(dataFromFile);

      return newAnimal;
    } catch (error) {
      console.error("Erro ao criar animal:", error);
      return null;
    }
  },

  updateAnimal(id: number, data: Partial<Animal>): Animal | null {
    try {
      const dataFromFile = getDataFromFile();
      const animal = dataFromFile.animais.find((a) => a.id === id);

      if (!animal) return null;

      if (data.tutor) {
        const tutor = dataFromFile.tutors.find((t) => t.id === data.tutor);
        if (!tutor) return null;
      }

      Object.assign(animal, data);

      saveDataToFile(dataFromFile);

      return animal;
    } catch (error) {
      console.error("Erro ao atualizar animal:", error);
      return null;
    }
  },

  deleteAnimal(id: number): boolean {
    try {
      const dataFromFile = getDataFromFile();
      const index = dataFromFile.animais.findIndex((a) => a.id === id);

      if (index === -1) return false;

      dataFromFile.animais.splice(index, 1);

      saveDataToFile(dataFromFile);

      return true;
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
      return false;
    }
  },
};
