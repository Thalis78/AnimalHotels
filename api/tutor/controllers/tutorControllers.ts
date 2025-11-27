import { tutors } from "../models/tutorModel.js";
import type { Tutor } from "../models/tutorModel.js";

export const tutorController = {
  getTutores(): Tutor[] {
    return tutors;
  },

  createTutor(data: Omit<Tutor, "id">): Tutor {
    const newTutor: Tutor = {
      id: tutors.length + 1,
      ...data,
    };
    tutors.push(newTutor);
    return newTutor;
  },

  updateTutor(id: number, data: Partial<Tutor>): Tutor | null {
    const tutor = tutors.find((t) => t.id === id);
    if (!tutor) return null;

    Object.assign(tutor, data);
    return tutor;
  },

  deleteTutor(id: number): boolean {
    const index = tutors.findIndex((t) => t.id === id);
    if (index === -1) return false;

    tutors.splice(index, 1);
    return true;
  },
};
