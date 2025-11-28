export type Animal = {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    tutor: number;
};

declare global {
    var animais: Animal[] | undefined;
}

export const animais: Animal[] =
    globalThis.animais ||
    (globalThis.animais = [
        {
            id: 1,
            nome: "Totó",
            especie: "Cachorro",
            raca: "Vira-lata",
            idade: 2,
            tutor: 1,
        },
    ]);
