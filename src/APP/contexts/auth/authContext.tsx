import { createContext } from "react";
import { LoginData, RegisterData, user } from "../../model/";

export type AuthContextType = {
    user: user | null;
    login: ({}: LoginData) => Promise<boolean>;
    loginKeep: ({}:LoginData) => Promise<boolean>;
    singup: ({}:RegisterData) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext <AuthContextType> (null!);


