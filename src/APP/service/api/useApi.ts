import axios, { AxiosInstance } from 'axios';
import { LoginAPI } from './loginAPI/LoginAPI';
import { RegisterAPI } from './registerAPI/RegisterAPI';

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
});

export const useAPI = ({
    Login: LoginAPI(api),
    Register: RegisterAPI(api)
})

