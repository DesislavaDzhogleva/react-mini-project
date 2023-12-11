import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from '../../../hooks/useForms';
import stlyes from '../../Site.module.css';
import { useAuth } from '../../../hooks/useAuth';

function CreateMenuCategory({onCreateCategory}) {
    const { state } = useAuth();
    const { values, onChange, onSubmit } = useForm({
        categoryName: "",
    }, onCreateCategory);

    return (
        <>
        {state.user?.role === 'Restaurant' && (
        <div className={stlyes.formContainer}>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formItemName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control onChange={onChange} name="categoryName" type="text" placeholder="Enter category name" value={values?.categoryName} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            
        </div>
        )}
        </>
    );
}

export default CreateMenuCategory;