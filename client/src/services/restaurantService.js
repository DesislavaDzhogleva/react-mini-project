import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/restaurants';

export const getAll = async () => {
    const result = await request.get(`${baseUrl}`);
    return result;
};

export const create = async (restaurant) => {
    const result = await request.post(`${baseUrl}`, restaurant);
    return result;
}

export const getOne = async (id) => {
    const result = await request.get(`${baseUrl}?${id}`);
    return result;
}

export const getByOwner = async (id) => {
    const query = new URLSearchParams({
        where: `_ownerId="${id}"`,
    }); 
    const result = await request.get(`${baseUrl}?${query}`);
    return result[0];
}
