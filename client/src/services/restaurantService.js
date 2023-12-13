import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/restaurants';

export const getAll = async () => {
    const result = await request.get(`${baseUrl}`);
    console.log(result);
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
