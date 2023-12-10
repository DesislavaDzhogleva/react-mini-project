import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import * as categoriesService from '../../../services/categoriesService';

const initialValues = {
    _id: '', 
    categoryName: '', 
}

function EditMenuCategory({onEditCategory}) {
    const [category, setCategory] = useState(initialValues);
    const id = useParams().id;
   
    useEffect(() => {
        categoriesService.getOne(id)
        .then(res => setCategory(res))
        .catch(err => console.log('error'));
    }, [id]);

   
    // const onEditCategory = async (e) => {
    //     e?.preventDefault();
    //     const values = Object.fromEntries(new FormData(e.currentTarget));
    //     await categoriesService.edit(values)
    //         .then(res => setCategory(res));
    //     navigate('/categories');
    // };

    const onChange = (e) => {
        setCategory(state => ({...state, [e.target.name]: e.target.value}));
    }

    return (
        <Form onSubmit={onEditCategory}>
             <Form.Control  onChange={onChange} name="_id" type="hidden" value={category?._id} />
            <Form.Group className="mb-3" controlId="formItemName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control onChange={onChange} name="categoryName" type="text" placeholder="Enter category name" value={category?.categoryName} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default EditMenuCategory;