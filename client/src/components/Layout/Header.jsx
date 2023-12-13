import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from "react-bootstrap/esm/NavItem";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from "../../hooks/useAuth";
import './Header.css';

export default function Header() {
    const { state } = useAuth();
   
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
                            className="cart-btn d-lg-flex">
                            Cart <span className="total-count" />
                        </button>
                        <Link to="/reserve" className="book-a-table-btn d-none d-lg-flex">
                            Reserve a table
                        </Link>
                    </div>
                )}
            </div>
        </header></>
       
    );
}
