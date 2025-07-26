// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext';
import { useContext } from 'react';

const App = () => {
  const {userData} = useContext(AppContext)
  return (
    <>
    <ToastContainer theme="dark" />
    <Routes>
      <Route path='/' element={userData ? <Home /> : <Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/reset-password' element={<ResetPassword />} />
    </Routes>
    </>
  )
}

export default App