import React, { createContext, useEffect, useReducer } from 'react';
import * as authService from '../services/authService.js';
import { useNavigate } from 'react-router-dom';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        role: action.payload.role,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
      };
    case ACTIONS.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);
  
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = async ({email, password}) => {
    try {
      const user = await authService.login(email, password);
      dispatch({ type: ACTIONS.LOGIN, payload: user });
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: ACTIONS.LOGOUT });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const register = async ({email, password, role, firstName, lastName}) => {
    try {
      const user = await authService.register(email, password, role, firstName, lastName);
      dispatch({ type: ACTIONS.REGISTER, payload: user });
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const authContextValue = {
    state,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};