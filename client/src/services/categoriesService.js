import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/mealCategories';
export const getAll = async () => {
    const query = new URLSearchParams({
        load: `owner=ownerId:users`,
    });

    const result = await request.get(`${baseUrl}/?${query}`);
    return result;
};

export const create = async (mealCategory) => {
    const result = await request.post(`${baseUrl}`, mealCategory);
    return result;
}

export const edit = async (mealCategory) => {

    const result = await request.put(`${baseUrl}/${mealCategory._id}`, mealCategory);
    return result;
}

export const getOne = async (id) => {
    const result = await request.get(`${baseUrl}/${id}`);
    return result;
}

export const remove = async (id) => {
    const response = await request.remove(`${baseUrl}/${id}`);
    return response;
}