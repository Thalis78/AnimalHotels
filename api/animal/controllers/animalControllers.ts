import { tutors } from "../../tutor/models/tutorModel.js";
import { animais } from "../models/animalModel.js";
import type { Animal } from "../models/animalModel.js";

export const animalController = {
    getAnimais(): Animal[] {
        return animais;
    },

    createAnimal(data: Omit<Animal, "id">): Animal | null {
        const newAnimal: Animal = {
            id: animais.length + 1,
            ...data,
        };

        const tutor = tutors.find((t) => t.id === data.tutor);

        if (!tutor) return null;

        animais.push(newAnimal);
        return newAnimal;
    },

    updateAnimal(id: number, data: Partial<Animal>): Animal | null {
        const animal = animais.find((a) => a.id === id);

        if (!animal) return null;

        if (data.tutor) {
            const tutor = tutors.find((t) => t.id === data.tutor);
            
            if (!tutor) return null;
        }

        Object.assign(animal, data);
        return animal;
    },

    deleteAnimal(id: number): boolean {
        const index = animais.findIndex((a) => a.id === id);

        if (index === -1) return false;

        animais.splice(index, 1);
        return true;
    },
};
