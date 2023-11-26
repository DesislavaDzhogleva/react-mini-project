import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/users';
export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, { email, password });
    console.log(email, password);
    console.log(result);
    return result;
};

export const register = async (email, password,  role) => {
    const result = await request.post(`${baseUrl}/register`, { email, password, role});
    return result;
}

export const logout = async () => {
    const result = await request.get(`${baseUrl}/logout`);
    return result;
}