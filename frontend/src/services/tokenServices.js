import { jwtDecode } from 'jwt-decode';
export const checkToken = () => {
  const token = localStorage.getItem('ams_token');
  // if token doesnt exist return false
  if (!token) {
    return false;
  }

  try {
    // decoded token with jwt-decode
    const decodedToken = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    // check the expiry time of token
    if (decodedToken.exp < currentTime) {
      // expired then remove it from localStorage
      localStorage.removeItem('ams_token');
      return false;
    }
    // token exists and is valid
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeToken = () => {
  localStorage.removeItem('ams_token');
};

export const setToken = (token) => {
  localStorage.setItem('ams_token', token);
};
