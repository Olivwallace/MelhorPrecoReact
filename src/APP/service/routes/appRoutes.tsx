//---------------------------- Import Dependencias
import { Route, Routes, BrowserRouter } from 'react-router-dom';

//---------------------------- Import pages 
import { Login, SingUp, Home, Lista,EnvioNota} from "../../pages/";

//---------------------------- Import Context
import { AuthProvider } from '../../contexts/auth/authProvider';
import { RequireAuth } from '../../contexts/auth/requireAuth';
import { CreateList } from '../../pages/createList';


//---------------------------- Define Rotas das Paginas
export const Routers = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path='/singup' element={<SingUp/>} />
                    <Route path='/lists' element={<RequireAuth><Lista/></RequireAuth>}/>
                    <Route path='/createList' element={<RequireAuth><CreateList/></RequireAuth>}/>
                    <Route path='/nota' element={<EnvioNota/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
