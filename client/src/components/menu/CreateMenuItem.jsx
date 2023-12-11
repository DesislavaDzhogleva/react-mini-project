import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import * as mealService from '../../services/mealService';
import * as categoriesService from '../../services/categoriesService';
import { useForm } from '../../hooks/useForms';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import stlyes from '../Site.module.css';
import mealReducer from '../../reducers/mealReducer';
import { useReducer } from 'react';



function CreateMenuItem({ onCreateMenuItem, menuItem }) {
    const [categories, setCategories] = useState([]);
    const { state } = useAuth();

    // const onCreateMenuItem2 = async (menuItem) => {
    //     let isValid = true;
    //     Object.keys(menuItem).forEach((field) => {
    //         console.log(field, menuItem[field] + ' fields');
    //     if(field === 'mealPrice') {
    //         if(validateNumberFields(field, menuItem[field]) === false) {
    //             isValid = false;
    //           }
    //     } 
    //     else{
    //         if (validateTextFields(field, menuItem[field]) === false) {
    //             isValid = false;
    //           }
    //     }
         
    //     });
      
    //     if (isValid) {
    //         console.log('is valid');
    //         const response = await mealService.create(menuItem);
    //         //setMenuItems([...menuItems, response]);
    //         //navigate('/menu');
    //     }
       
    //     console.log('is not valid');

    // }

   

    useEffect(() => {
        categoriesService.getAll(state?.user?._id)
            .then(res => setCategories(res))
            .catch(err => console.log(`error in categories - ${err.message}`));
    }, [state?.user?._id]);

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
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.mealImageError ? 'block' : 'none' }}>
                        {menuItem.mealImageError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Meal Name</Form.Label>
                    <Form.Control name="mealName" type="text" placeholder="Enter meal name" onChange={onChange} value={values?.mealName} />
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.mealNameError ? 'block' : 'none' }}>
                        {menuItem.mealNameError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemDescription">
                    <Form.Label>Meal Description</Form.Label>
                    <Form.Control name="mealDescription" as="textarea"  placeholder="Enter meal description" onChange={onChange} value={values?.mealDescription} />
                    <Form.Control.Feedback type="invalid" style={{display: menuItem.mealDescriptionError ? 'block' : 'none' }}>
                        {menuItem.mealDescriptionError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formItemPrice">
                    <Form.Label>Meal Price</Form.Label>
                     <Form.Control type="text" name="mealPrice" min="1" placeholder="Enter meal price" onChange={onChange} value={values?.mealPrice} />
                     <Form.Control.Feedback type="invalid" style={{display: menuItem.mealPriceError ? 'block' : 'none' }}>
                        {menuItem.mealPriceError}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Meal Category" name="categoryId" onChange={onChange} value={values?.categoryId} >
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