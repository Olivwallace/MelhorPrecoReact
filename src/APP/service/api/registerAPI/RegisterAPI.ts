import { AxiosInstance } from "axios";
import { RegisterData } from "../../../model";

export const RegisterAPI = (api: AxiosInstance) => ({

    existEmail: async (email : string) => {
        const response = await api.post('/existEmail', {'email': email});
        return response.data;
    },

    existUser: async (cpf : string) => {
        const response = await api.post('/existUser', {'CPF': cpf});
        return response.data;
    },

    register: async ({user, loginData}:RegisterData) => {
        const response = await api.post('/registerUser', {user, loginData})
        return response.data;
    }
});