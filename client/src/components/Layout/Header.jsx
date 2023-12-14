import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from "react-bootstrap/esm/NavItem";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../../hooks/useAuth";
import './Header.css';
import CartModal from '../modal/Modal';
import Cart from '../shoppingCart/Cart';
import { useState } from "react";
import {useCartContext} from '../../contexts/cartContext';

export default function Header() {
    const { state } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cart } = useCartContext();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const totalQty = cart.reduce((acc, item) => {
        return acc + item.quantity
      }, 0);

    return (
        <>
      <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                <div className="navbar navbar-default">
                    <h1 className="logo me-auto me-lg-0">
                        <Link
                            className="navbar-brand"
                            to="/"> EasyEat </Link>
                    </h1>
                </div>
                <Nav className="me-auto">
                    {state.isAuthenticated && state?.user.role === 'Restaurant' && (
                        <Link to="/categories" className="nav-link text-white">Categories</Link>
                    )}
                     {state.isAuthenticated && state?.user.role === 'Client' && (
                        <Link to="/restaurants" className="nav-link text-white">Restaurants</Link>
                    )}
                        <Link to="/menu" className="nav-link text-white">Menu</Link>
                </Nav>

                {state.isAuthenticated && state?.user.role === 'Client' && (
                    <div className="nav navbar-nav navbar-right right-menu">
                        <button
                            type="button"
                            className="cart-btn d-lg-flex"
                            onClick={openModal}>
                            Cart <span className="total-count"> ({totalQty})</span>
                        </button>
                        <Link to="/reserve" className="book-a-table-btn d-none d-lg-flex">
                            Reserve a table
                        </Link>
                    </div>
                )}
            </div>
        </header>
        {isModalOpen && (
                <CartModal closeModal={closeModal}>
                   <Cart closeModal={closeModal}/>
                </CartModal>
            )}</>
       
    );
}
