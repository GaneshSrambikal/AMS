// import { createContext, useEffect, useReducer, useState } from 'react';
// import api from '../services/api';
// import { jwtDecode } from 'jwt-decode';
// import { checkToken, removeToken, setToken } from '../services/tokenServices';

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   role: null,
//   token: localStorage.getItem('ams_token') || null,
//   isAuthenticated: false,
//   loading: true,
// };

// const actionTypes = {
//   LOGIN: 'LOGIN',
//   LOGOUT: 'LOGOUT',
//   LOAD_USER: 'LOAD_USER',
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.LOGIN:
//       return {
//         ...state,
//         user: action.payload.decoded,
//         role: action.payload.role,
//         token: action.payload.token,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case actionTypes.LOGOUT:
//       return {
//         ...state,
//         user: null,
//         token: null,
//         isAuthenticated: false,
//         loading: true,
//       };
//     case actionTypes.LOAD_USER:
//       return {
//         ...state,
//         user: action.payload.userData,
//         role: action.payload.role,
//         token: action.payload.token,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case actionTypes.SET_LOADING:
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   // const [user, setUser] = useState(null);
//   // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const loadUser = async () => {
//     const token = localStorage.getItem('ams_token');
//     const user = localStorage.getItem('ams_user');
//     if (checkToken(token) && user !== null) {
//       try {
//         // const res = await api.get('/users/detail');
//         // const userData = res.data;
//         dispatch({
//           type: actionTypes.LOAD_USER,
//           payload: { user, token, role: user.role },
//         });
//       } catch (error) {
//         console.log(error);
//         dispatch({ type: actionTypes.LOGOUT });
//       }
//     } else {
//       dispatch({ type: actionTypes.LOGOUT });
//     }
//     // Set loading to false after checking the user
//     dispatch({ type: actionTypes.SET_LOADING, payload: false });
//   };

//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post('/auth/login', { email, password });
//       console.log(data);
//       setToken(data.token); // from token services
//       localStorage.setItem('ams_user', JSON.stringify(data.user));
//       const decoded = jwtDecode(data.token);
//       dispatch({
//         type: actionTypes.LOGIN,
//         payload: { decoded, token: data.token, role: decoded.role },
//       });
//       return data.user;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Login Failed');
//     }
//   };

//   const logout = () => {
//     try {
//       localStorage.removeItem('ams_user');
//       removeToken();
//       dispatch({
//         type: actionTypes.LOGOUT,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ ...state, dispatch, login, loadUser, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

// NEW CODE

import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('ams_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data?.user);
      localStorage.setItem('ams_user', JSON.stringify(data.user));
      localStorage.setItem('ams_token', data.token);
      localStorage.setItem('ams_userId', data?.user?.id);
      navigate('/dashboard');
      return data; // ✅ Instead of navigating here, return the user role
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ams_user');
    localStorage.removeItem('ams_token');
    localStorage.removeItem('ams_userId');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
