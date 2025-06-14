import './App.css'
import Login from './Screens/Acesso/Login/Login'
import Signup from './Screens/Acesso/Signup/Signup'
import { OngPage } from './Components/Layout/OngPage'
import { UserManagement } from './Screens/RoleManagement/UserManagement'
import { History } from './Screens/History/History'
import { ListDonators } from './Screens/ListDonators/ListDonators'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Access } from './Screens/Acesso/Access'
import Donate from './Screens/Donate/Donate'
import HomePage from './Screens/HomePage/HomePage'
import { Relatorio } from './Screens/Relatorio/Relatorio'
import { Profile } from './Screens/Profile/Profile'
import { ProtectedRoutes } from './Screens/Acesso/ProtectedRoutes'
import { AuthProvider } from './Contexts/AuthContext' 
import { AdminRoutes } from './Screens/Acesso/AdminRoutes'
import { ToastProvider } from './Contexts/ToastContext';
import { ToastContainer } from './Components/toast/ToastContainer';

function App() {

  return (
    <>
    <ToastProvider renderToasts={(toasts) => <ToastContainer toasts={toasts} />}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="inicio" element={<Access />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            <Route element={<ProtectedRoutes/>}>
              <Route path="/" element={<OngPage />}>
                <Route path="historico" element={<History />} />
                <Route path="doar" element={<Donate/>}/>
                <Route path="relatorio" element={<Relatorio/>}/>
                <Route path="perfil" element={<Profile/>}/>
                <Route path="homePage" element={<HomePage/>}/>
                <Route element={<AdminRoutes />}>
                  <Route path="doadores" element={<ListDonators/>}/>
                  <Route path="gerenciar" element={<UserManagement/>}/>
                  <Route path="cargos" element={<UserManagement />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
    </>
  );
}

export default App
