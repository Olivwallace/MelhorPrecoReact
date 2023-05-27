import axios, { AxiosInstance } from 'axios';
import { LoginAPI } from './loginAPI/LoginAPI';
import { RegisterAPI } from './registerAPI/RegisterAPI';
import { HomeAPI } from './HomeAPI/HomeApi';
import { ListaAPI } from './ListsAPI/ListAPI'
import { NotaAPI } from './notaAPI/NotaAPI';
const api = axios.create({
    baseURL: "http://localhost:4567",
});

export const useAPI = ({
    Login: LoginAPI(api),
    Register: RegisterAPI(api),
    Home: HomeAPI(api),
    Lista: ListaAPI(api),
    Nota: NotaAPI(api)
})

