import { createContext } from "react";
import { LoginData, RegisterData, user, userLocal } from "../../model/";

export type AuthContextType = {
    user: user | null;
    login: ({}: LoginData) => Promise<boolean>;
    loginKeep: ({}:LoginData) => Promise<boolean>;
    singup: ({}:RegisterData) => Promise<boolean>;
    session: () => boolean;
    usuario: () => userLocal | null;
    validToken: () => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext <AuthContextType> (null!);


