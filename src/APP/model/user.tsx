export type user = {
    id?: number;
    name?: string;
    email: string;
    password?: string;
}

export type userLocal = {
    id: number;
    name: string,
    email: string
}

export type UserData = {
    'CPF': string,
    'nome': string,
    'sobrenome': string,
    'genero': string,
    'nascimento': string
}