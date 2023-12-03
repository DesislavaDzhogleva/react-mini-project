// import { useContext, useEffect } from "react";

// import * as authService from '../../services/authService';
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// // import AuthContext from "../../contexts/authContext";

// export default function Logout() {
//     const navigate = useNavigate();
//     const { logout } = useAuth();

//     useEffect(() => {
//         console.log('logout');
//         authService.logout()
//             .then(() => {
//                 logoutHandler();
//                 navigate('/');
//             })
//             .catch(() => navigate('/'));
//     }, []);

//     return null;
// }