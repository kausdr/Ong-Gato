import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Screens/Login/Login'
import Signup from './Screens/Signup/Signup'
import { UserManagement } from './Screens/RoleManagement/UserManagement'
import { History } from './Components/data-input/History/History'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react'
import { UserService } from './API/user'

function App() {

  const fetchUsers = () => {
    return UserService.getUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>



      <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>} />
        <Route path="cargos" element={<UserManagement/>}/>
        <Route path="historico" element={<History/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
