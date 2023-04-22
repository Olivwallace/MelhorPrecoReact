import { AxiosInstance } from "axios";
import { LoginData } from "../../../model";

export const LoginAPI = (api: AxiosInstance) => ({
    validateToken: async (token: string) => {
        return {
            user: {id: 123, name: "Wallace", email:"Wallace@gmail.com"}
        };
        const response = await api.post('/validateToken', {token});
        return response.data;
    },

    login : async ({email, pass}: LoginData) => {
        const response = await api.post('/login', {email: email, pass: pass});
        return response.data;

        return (email === "wllace@gmail.com" && pass === "Pas123")?{
            user: {id: 123, name: "Wallace", email:"Wallace@gmail.com"},
            token: "wa1214scas"
        }:{stutus: 400, user: null};
        response.data;
    },

    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    }
})