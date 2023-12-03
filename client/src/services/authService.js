import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/users';
export const login = async (email, password) => {
    const user = await request.post(`${baseUrl}/login`, { email, password });
    console.log(JSON.stringify(user));

    localStorage.setItem('accessToken', user.accessToken);
    return user;
  };

export const register = async (email, password, role, firstName, lastName) => {
    console.log('register' + email, password, role, firstName, lastName);
    const username = email;
    const result = await request.post(`${baseUrl}/register`, { email, password, role, firstName, lastName, username});
    console.log(JSON.stringify(result));

    localStorage.setItem('accessToken', result.accessToken);
    return result;
}

export const logout = async () => {
    const result = await request.get(`${baseUrl}/logout` );
    localStorage.removeItem('accessToken');
    return result;
}