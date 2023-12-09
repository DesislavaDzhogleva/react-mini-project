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
import MenuList from './components/menu/MenuList';
import CategoriesList from './components/menu/categories/CategoriesList';
import CreateMenuCategory from './components/menu/categories/CreateCategory';

function App() {
  
  return (
    <>
     <AuthProvider>
        <TopBar />
        <Header />
        <section className="inner-page">
          <div>
            <Hero />
              <main id="main">
              <MenuList />
              {/* <CategoriesList /> */}
                
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/categories' element={<CategoriesList />}>
                  <Route path='createCategory' element={<CreateMenuCategory />} />
                </Route>
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
