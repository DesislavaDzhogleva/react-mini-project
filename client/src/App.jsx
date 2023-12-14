import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/layout/Header'
import  { AuthProvider } from './contexts/authContext';
import {CartProvider} from './contexts/cartContext';
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
import EditMenuCategory from './components/menu/categories/EditCategory';
import CreateMenuItem from './components/menu/CreateMenuItem';
import EditMenuItem from './components/menu/EditMenuItem';
import RestaurantList from './components/restaurants/RestaurantsList';
import Cart from './components/shoppingCart/Cart';

function App() {

  return (
    <>
     <AuthProvider>
      <CartProvider>
        <TopBar />
        <Header />
        <section className="inner-page">
          <div>
            <Hero />
              <main id="main container">

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/restaurants' element={<RestaurantList />} />
                <Route path='/menu' element={<MenuList />}>
                  <Route path='createMeal' element={<CreateMenuItem />} />
                  <Route path='editMeal/:id' element={<EditMenuItem />} />
                </Route>

                <Route path='/categories' element={<CategoriesList />}>
                  {/* TODO: Why do i need these two routes? */}
                  <Route path='createCategory' element={<CreateMenuCategory />} />
                  <Route path='editCategory/:id' element={<EditMenuCategory />} />
                </Route>
              </Routes>
              </main>
          </div>
        </section>
        </CartProvider>
        </AuthProvider>
    </>
  )
}

export default App
