import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as mealService from '../../services/mealService';
import * as categoriesService from '../../services/categoriesService';
import { useForm } from '../../hooks/useForms';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState, useRef } from 'react';
import stlyes from '../Site.module.css';
import { useNavigate, useParams } from "react-router-dom";

function EditMenuItem({ onEditMenuItem }) {
    const [meal, setMeal] = useState({});
    const [categories, setCategories] = useState([]);
    const { state } = useAuth();
    const id = useParams().id;
    const formRef = useRef(null);
    useEffect(() => {
        const containerPosition = formRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: containerPosition - 50,
            behavior: 'smooth'
        });
    }, [id]);

    useEffect(() => {
        mealService.getOne(id)
        .then(res => setMeal(res))
        .catch(err => console.log('error'));

        categoriesService.getAll(state?.user?._id)
        .then(res => setCategories(res))
        .catch(err => console.log(`error in categories - ${err.message}`));
    }, [id, state?.user?._id]);

    console.log('Edit mean ' + meal.mealName);


    const onChange = (e) => {
        setMeal(state => ({...state, [e.target.name]: e.target.value}));
    }

    return (
        <div ref={formRef} className={stlyes.formContainer}>
            <Form onSubmit={onEditMenuItem}>
                 <Form.Control  onChange={onChange} name="_id" type="hidden" value={meal?._id} />
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control name="mealImage" type="text"  onChange={onChange}  value={meal?.mealImage}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control name="mealName" type="text" placeholder="Enter meal name" onChange={onChange} value={meal?.mealName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemDescription">
                    <Form.Label>Meal Description</Form.Label>
                    <Form.Control name="mealDescription" as="textarea"  placeholder="Enter meal description" onChange={onChange} value={meal?.mealDescription} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemPrice">
                    <Form.Label>Meal Price</Form.Label>
                    <Form.Control type="number" name="mealPrice" min="1" placeholder="Enter meal price" onChange={onChange} value={meal?.mealPrice} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Meal Category" name="categoryId" onChange={onChange} value={meal?.categoryId} >
                        <option>Open categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

            
                <Button variant="primary" type="submit">
                    Edit Meal
                </Button>
            </Form>
        </div>
    );
}

export default EditMenuItem;