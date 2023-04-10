import { AxiosInstance } from "axios";
import { RegisterData } from "../../../model";

export const RegisterAPI = (api: AxiosInstance) => ({

    existEmail: async (email : string) => {
        return {
            status: 200,
            exists: true
        }
        const response = await api.post('/existEmail', {email});
    },

    existUser: async (cpf : string) => {
        return {
            status: 200,
            exists: true
        }
        const response = await api.post('/existeUser', {cpf});
    },

    register: async ({user, loginData}:RegisterData) => {
        return {
            register: true,
            user:{name: "Wallace", email: "wallace@gmail.com"}
        };
        const response = await api.post('/registerUser', {user, loginData})
    }
});