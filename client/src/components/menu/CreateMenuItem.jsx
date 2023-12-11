import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as mealService from '../../services/mealService';
import * as categoriesService from '../../services/categoriesService';
import { useForm } from '../../hooks/useForms';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import stlyes from '../Site.module.css';

function CreateMenuItem({ onCreateMenuItem }) {
    const [categories, setCategories] = useState([]);
    const { state } = useAuth();

    useEffect(() => {
        categoriesService.getAll(state?.user?._id)
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [state?.user?._id]);

    console.log(categories);

    const { values, onChange, onSubmit } = useForm({
        mealName: "",
        mealDescription: "",
        mealPrice: "",
        mealImage: "",
        categoryId: "",
    }, onCreateMenuItem);

    return (
        <div className={stlyes.formContainer}>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control name="mealImage" type="text"  onChange={onChange}  value={values?.mealImage}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control name="mealName" type="text" placeholder="Enter meal name" onChange={onChange} value={values?.mealName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemDescription">
                    <Form.Label>Meal Description</Form.Label>
                    <Form.Control name="mealDescription" as="textarea"  placeholder="Enter meal description" onChange={onChange} value={values?.mealDescription} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemPrice">
                    <Form.Label>Meal Price</Form.Label>
                    <Form.Control type="number" name="mealPrice" min="1" placeholder="Enter meal price" onChange={onChange} value={values?.mealPrice} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Meal Category" name="categoryId" onChange={onChange} value={values?.categoryId} >
                        <option>Open categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

            
                <Button variant="primary" type="submit">
                    Create Meal
                </Button>
            </Form>
        </div>
    );
}

export default CreateMenuItem;