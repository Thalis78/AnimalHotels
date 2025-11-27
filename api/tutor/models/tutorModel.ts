export type Tutor = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
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
      email: "lucashowmorais@gmail.com",
      telefone: "11999999999",
    },
  ]);
