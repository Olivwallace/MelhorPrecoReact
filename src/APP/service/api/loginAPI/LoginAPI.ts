import { AxiosInstance } from "axios";
import { LoginData } from "../../../model";

export const LoginAPI = (api: AxiosInstance) => ({
    validateToken: async (token: string) => {
        const response = await api.post('/validateToken', {token:token});
        console.log(response.data.data);
        return response.data.data;
    },

    login : async ({email, password,token}: LoginData) => {
        const response = await api.post('/login', {email, password,token});
        console.log(response.data.data);
        return response.data.data;
    },

    logout: async () => {
        const response = await api.post('/logout');
        console.log(response);
        return response.data;
    }
})