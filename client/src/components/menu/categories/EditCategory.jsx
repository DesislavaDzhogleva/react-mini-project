import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import * as categoriesService from '../../../services/categoriesService';
import { useAuth } from '../../../hooks/useAuth';

const initialValues = {
    _id: '',
    categoryName: '',
}

function EditMenuCategory({ onEditCategory }) {
    const [category, setCategory] = useState(initialValues);
    const id = useParams().id;
    const { state } = useAuth();

    useEffect(() => {
        categoriesService.getOne(id)
            .then(res => setCategory(res))
            .catch(err => console.log('error'));
    }, [id]);

    const onChange = (e) => {
        setCategory(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <>
            {state.user?.role === 'Restaurant' && (
                    <Form onSubmit={onEditCategory}>
                        <Form.Control onChange={onChange} name="_id" type="hidden" value={category?._id} />
                        <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control onChange={onChange} name="categoryName" type="text" placeholder="Enter category name" value={category?.categoryName} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )
            }
        </>
    );
}

export default EditMenuCategory;