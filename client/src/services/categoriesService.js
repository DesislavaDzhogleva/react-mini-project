import * as request from '../libs/requests.js';
const baseUrl = 'http://localhost:3030/data/mealCategories';
export const getAll = async () => {
    const query = new URLSearchParams({
        load: `owner=ownerId:users`,
    });

    const result = await request.get(`${baseUrl}/?${query}`);
    console.log(result);
    return result;
};

export const create = async (mealCategory) => {
    const categoryName = mealCategory.categoryName;
    const result = await request.post(`${baseUrl}`, {categoryName});
    return result;
}

export const edit = async (mealCategory) => {
    const result = await request.put(`${baseUrl}/${mealCategory._id}`, {mealCategory});
    return result;
}