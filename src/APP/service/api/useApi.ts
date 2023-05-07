import axios, { AxiosInstance } from 'axios';
import { LoginAPI } from './loginAPI/LoginAPI';
import { RegisterAPI } from './registerAPI/RegisterAPI';
import { HomeAPI } from './HomeAPI/HomeApi';

const api = axios.create({
    baseURL: "http://localhost:4567",
});

export const useAPI = ({
    Login: LoginAPI(api),
    Register: RegisterAPI(api),
    Home: HomeAPI(api)
})

