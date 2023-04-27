import { AxiosInstance } from "axios";
import { LoginData } from "../../../model";

export const LoginAPI = (api: AxiosInstance) => ({
    validateToken: async (token: string) => {
        return {
            user: {id: 123, name: "Wallace", email:"Wallace@gmail.com"}
        };
        const response = await api.post('/validateToken', {token:token});
        return response.data;

    },

    login : async ({email, pass,token}: LoginData) => {

        return (email === "jerson@gmail.com" && pass === "Pas123")?{
            
                "status": 200,
                "mensagem": "SUCESS",
                "data": {
                    "user": {
                        "id": 4,
                        "nome": "Wallace Freitas",
                        "email": "jerson@gmail.com"
                    },
                    "token": "glt4HLRRJXJnpykbwpbe"
                }
            
        }:{stutus: 400, user: null};
        const response = await api.post('/login', {email, pass,token});
        return response.data;


    },

    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    }
})