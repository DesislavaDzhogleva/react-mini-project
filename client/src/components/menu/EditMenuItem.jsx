/**
 * EditMenuItem Component Documentation
 * 
 * Overview:
 * The `EditMenuItem` component is a React functional component responsible for editing a menu item. It utilizes React Router for navigation and authentication using the `useAuth` hook.

 * Dependencies:
 * - React: Used for building the user interface.
 * - React Bootstrap: Provides UI components for the application.
 * - `categoriesService` module: Provides methods for interacting with categories.
 * - `mealService` module: Provides methods for interacting with the menu items.
 * - `useAuth` hook: Used for managing authentication state.

 * Props:
 * - updateMeals: Function to update the list of menu items after editing.

 * State Management:
 * The component uses the `useReducer` hook to manage the state of the edited menu item and the `useState` hook to manage the list of categories.

 * Navigation:
 * The component uses React Router for navigation, including redirecting to the menu page after editing a menu item.

 * Error Handling:
 * Errors from fetching categories and editing menu items are caught and logged to the console.

 * Additional Notes:
 * - The component assumes that the user's role is stored in the `state` object.
 */

import { useEffect, useReducer, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from "react-router-dom";
import { initialMenuItemState } from '../../constants/mealConstants';
import { useAuth } from '../../hooks/useAuth';
import mealReducer from '../../reducers/mealReducer';
import * as categoriesService from '../../services/categoriesService';
import * as mealService from '../../services/mealService';
import { validateFormFields } from '../../utils/formValidator';
import stlyes from '../Site.module.css';

function EditMenuItem({ updateMeals }) {
    const navigate = useNavigate();

    const [editMenuItem, editDispatch] = useReducer(mealReducer, initialMenuItemState);

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

        (async () => {
            const meal = await mealService.getOne(id);
            setMealInitialDetails(meal);
        })();

        categoriesService.getAll(state?.user?._id)
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [id, state?.user?._id]);

    const setMealInitialDetails = (meal) => {
        for (const property in meal) {
            editDispatch({ type: `SET_${(property).toUpperCase()}`, payload: meal[property] })
        }
    }

    const onEditMenuItem = async (e) => {
        e?.preventDefault();
        const editValues = Object.fromEntries(new FormData(e.currentTarget));
        let isValid = validateFormFields(editValues, editDispatch);
        if (isValid) {
            const response = await mealService.edit(editValues);
            updateMeals(response);

            navigate('/menu');
        }
    };

    const onChange = (e) => {
        editDispatch({ type: `SET_${(e.target.name).toUpperCase()}`, payload: e.target.value })
    }

    return (
        <div ref={formRef} className={stlyes.formContainer}>
            <Form onSubmit={onEditMenuItem}>
                <Form.Control onChange={onChange} name="_id" type="hidden" value={editMenuItem?._id} />
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control name="mealImage" type="text" onChange={onChange} value={editMenuItem?.mealImage} />
                    <Form.Control.Feedback type="invalid" style={{ display: editMenuItem?.mealImageError ? 'block' : 'none' }}>
                        {editMenuItem?.mealImageError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control name="mealName" type="text" placeholder="Enter meal name" onChange={onChange} value={editMenuItem?.mealName} />
                    <Form.Control.Feedback type="invalid" style={{ display: editMenuItem?.mealNameError ? 'block' : 'none' }}>
                        {editMenuItem?.mealNameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemDescription">
                    <Form.Label>Meal Description</Form.Label>
                    <Form.Control name="mealDescription" as="textarea" placeholder="Enter meal description" onChange={onChange} value={editMenuItem?.mealDescription} />
                    <Form.Control.Feedback type="invalid" style={{ display: editMenuItem?.mealDescriptionError ? 'block' : 'none' }}>
                        {editMenuItem?.mealDescriptionError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemPrice">
                    <Form.Label>Meal Price</Form.Label>
                    <Form.Control type="number" name="mealPrice" min="1" placeholder="Enter meal price" onChange={onChange} value={editMenuItem?.mealPrice} />
                    <Form.Control.Feedback type="invalid" style={{ display: editMenuItem?.mealPriceError ? 'block' : 'none' }}>
                        {editMenuItem?.mealPriceError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Meal Category" name="categoryId" onChange={onChange} value={editMenuItem?.categoryId} >
                        <option>Open categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{ display: editMenuItem?.categoryIdError ? 'block' : 'none' }}>
                        {editMenuItem?.categoryIdError}
                    </Form.Control.Feedback>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Edit Meal
                </Button>
            </Form>
        </div>
    );
}

export default EditMenuItem;