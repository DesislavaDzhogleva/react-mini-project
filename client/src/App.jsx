import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {useAuth} from './hooks/useAuth';

import Header from './components/layout/Header'
import  { AuthProvider } from './contexts/authContext';
import TopBar from './components/layout/TopBar'
import Home from './components/Home';
import Login from './components/users/Login';
import Register from './components/users/Register';
// import Logout from './components/users/Logout';
import Hero from './components/Hero';
import * as authService from './services/authService';

function App() {
  // const navigate = useNavigate({});
  // const { state, authService } = useAuth();

  // const loginSubmitHandler = async (values) => {

  //   const result = await authService.login(values.email, values.password, values.role);
  //   setAuth(result);
  //   navigate('/');
  // };

  // const registerSubmitHandler = async (values) => {
  //   const result = await authService.register(values.email, values.password);
   
  //   setAuth(result);
  //   localStorage.setItem('accessToken', result.accessToken);
  //   navigate('/');
  // };

  // const logoutHandler = async () => {
  //   const result = await authService.logout();
  //   setAuth({});
  //   console.log('logout handler');
  //   localStorage.removeItem('accessToken');
  //   navigate('/');
  // };


  // const data = { loginSubmitHandler, registerSubmitHandler, logoutHandler, username: auth.username || auth.email, email: auth.email, isAuth: !!auth.accessToken };

  return (
    <>
     <AuthProvider>
        <TopBar />
        <Header />
        <section className="inner-page">
          <div>
            <Hero />
              <main id="main">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                {/* <Route path='/logout' element={<Logout />} /> */}
              </Routes>
              </main>
          </div>
        </section>
        </AuthProvider>
    </>
  )
}

export default App
