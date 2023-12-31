import { Link } from "react-router-dom"
import './TopBar.css';
import { useAuth } from "../../hooks/useAuth";

export default function TopBar() {
    
    const { state, logout } = useAuth();
    return(
        <div id="topbar" className="topbar d-flex align-items-center fixed-top">
            <div className="container d-flex justify-content-center justify-content-md-between">

                <div className="contact-info d-flex align-items-center">
                    <i className="bi bi-phone d-flex align-items-center"><span>+1 5589 55488 55</span></i>
                    <i className="bi bi-clock d-flex align-items-center ms-4"><span> Mon-Sat: 11AM - 23PM</span></i>
                </div>

                <div className="items d-none d-md-flex align-items-center pt-1">
                    <ul>
                        {state.isAuthenticated && (
                        <>
                            <button type="button" className="btn btn-link link"> Hello, {state.user.username}!</button>
                            <li>
                                <button onClick={logout} className="btn-primary">Logout</button>
                                {/* <Link  className="btn-primary" to="/logout">Logout</Link> */}
                            </li>
                        </>
                        )}

                        {!state.isAuthenticated && (
                        <>
                            <li>
                                <Link id="register" to="/Register">Register</Link>
                            </li>
                            <li>
                                <Link id="login" to="/Login">Login </Link>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
};

