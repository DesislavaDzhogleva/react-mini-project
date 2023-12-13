/**
 * CreateMenuItem Component Documentation
 * 
 * Overview:
 * The `CreateMenuItem` component is a React functional component responsible for creating a new menu item. It utilizes React Router for navigation and authentication using the `useAuth` hook.

 * Dependencies:
 * - React: Used for building the user interface.
 * - React Bootstrap: Provides UI components for the application.
 * - `categoriesService` module: Provides methods for interacting with categories.
 * - `mealService` module: Provides methods for interacting with the menu items.
 * - `useAuth` hook: Used for managing authentication state.

 * Props:
 * - addMeals: Function to add the newly created menu item to the list of menu items.

 * State Management:
 * The component uses the `useReducer` hook to manage the state of the new menu item and the `useState` hook to manage the list of categories.

 * Navigation:
 * The component uses React Router for navigation, redirecting to the menu page after creating a new menu item.

 * Error Handling:
 * Errors from fetching categories and creating menu items are caught and logged to the console.

 * Additional Notes:
 * - The component assumes that the user's role is stored in the `state` object.
 */

import { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { initialMenuItemState } from '../../constants/mealConstants';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForms';
import mealReducer from '../../reducers/mealReducer';
import * as categoriesService from '../../services/categoriesService';
import * as mealService from '../../services/mealService';
import { validateFormFields } from '../../utils/formValidator';
import stlyes from '../Site.module.css';
import {useRef} from 'react';


function CreateMenuItem({ addMeals }) {
    const [categories, setCategories] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();
    const [menuItem, dispatch] = useReducer(mealReducer, initialMenuItemState);
    const formRef = useRef(null);
    const onCreateMenuItem = async (e) => {
        e?.preventDefault();
        const menuItem = Object.fromEntries(new FormData(e.currentTarget));
        let isValid = validateFormFields(menuItem, dispatch);

        if (isValid) {
            const response = await mealService.create(menuItem);
            addMeals(response);
            navigate('/menu');
        }
    }

    useEffect(() => {
        const containerPosition = formRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: containerPosition - 50,
            behavior: 'smooth'
        });
        
        categoriesService.getAll(state?.user?._id)
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [state?.user?._id]);

    const onChange = (e) => {
        dispatch({ type: `SET_${(e.target.name).toUpperCase()}`, payload: e.target.value })
    }

    return (
        <div ref={formRef} className={stlyes.formContainer}>
            <Form onSubmit={onCreateMenuItem}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Image Path</Form.Label>
                    <Form.Control name="mealImage" type="text"  onChange={onChange}  value={menuItem?.mealImage}/>
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.mealImageError ? 'block' : 'none' }}>
                        {menuItem.mealImageError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control name="mealName" type="text" placeholder="Enter meal name" onChange={onChange} value={menuItem?.mealName} />
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.mealNameError ? 'block' : 'none' }}>
                        {menuItem.mealNameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemDescription">
                    <Form.Label>Meal Description</Form.Label>
                    <Form.Control name="mealDescription" as="textarea"  placeholder="Enter meal description" onChange={onChange} value={menuItem?.mealDescription} />
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.mealDescriptionError ? 'block' : 'none' }}>
                        {menuItem.mealDescriptionError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemPrice">
                    <Form.Label>Meal Price</Form.Label>
                     <Form.Control type="text" name="mealPrice" min="1" placeholder="Enter meal price" onChange={onChange} value={menuItem?.mealPrice} />
                     <Form.Control.Feedback type="invalid" style={{display: menuItem.mealPriceError ? 'block' : 'none' }}>
                        {menuItem.mealPriceError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Meal Category" name="categoryId" onChange={onChange} value={menuItem?.categoryId} >
                        <option>Open categories</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.categoryIdError ? 'block' : 'none' }}>
                        {menuItem.categoryIdError}
                    </Form.Control.Feedback>
                </Form.Group>

            
                <Button variant="primary" type="submit">
                    Create Meal
                </Button>
            </Form>
        </div>
    );
}

export default CreateMenuItem;