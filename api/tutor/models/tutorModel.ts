export type Tutor = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
};

declare global {
  var tutors: Tutor[] | undefined;
}

export const tutors: Tutor[] =
  globalThis.tutors ||
  (globalThis.tutors = [
    {
      id: 1,
      nome: "Lucas Show Morais",
      email: "1@gmail.com",
      telefone: "11999999999",
      senha: "1",
    },
  ]);
