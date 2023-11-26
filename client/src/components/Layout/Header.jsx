import React from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from "../../contexts/authContext";
import './Header.css';

export default function Header() {
    const {
        isAuth,
    } = useContext(AuthContext);

    return (
        <header id="header" className="fixed-top d-flex align-items-center">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
                <div className="navbar navbar-default">
                    <h1 className="logo me-auto me-lg-0">
                        <Link
                            className="navbar-brand"
                            to="/"> EasyEat </Link>
                    </h1>
                </div>
                {isAuth && (
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
        </header>
    );
}
