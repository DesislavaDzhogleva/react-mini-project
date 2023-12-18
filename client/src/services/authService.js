import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/users';
import * as restaurantService from './restaurantService.js';

export const login = async (email, password) => {
    const user = await request.post(`${baseUrl}/login`, { email, password });
    localStorage.setItem('accessToken', user.accessToken);
    if(user.role === 'Restaurant'){
        localStorage.setItem('pickedRestaurant', user._id);
    }
    return user;
  };

export const register = async (email, password, role, firstName, lastName) => {
    const username = email;
    const result = await request.post(`${baseUrl}/register`, { email, password, role, firstName, lastName, username});
    localStorage.setItem('accessToken', result.accessToken);
    
    if(role === 'Restaurant'){
        const restaurant = await restaurantService.create({restaurantName: firstName});
        localStorage.setItem('pickedRestaurant', restaurant._ownerId);

    }
    return result;
}

export const logout = async () => {
    const result = await request.get(`${baseUrl}/logout` );
    localStorage.removeItem('accessToken');
    localStorage.removeItem('pickedRestaurant');
    return result;
}