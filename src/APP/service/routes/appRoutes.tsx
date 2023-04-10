//---------------------------- Import Dependencias
import { Route, Routes, BrowserRouter } from 'react-router-dom';

//---------------------------- Import pages 
import { Login, SingUp, Home } from "../../pages/";

//---------------------------- Import Context
import { AuthProvider } from '../../contexts/auth/authProvider';
import { RequireAuth } from '../../contexts/auth/requireAuth';


//---------------------------- Define Rotas das Paginas
export const Routers = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<RequireAuth><Home/></RequireAuth>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path='/singup' element={<SingUp/>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
