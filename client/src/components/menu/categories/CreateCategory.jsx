import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForms';
import * as categoriesService from '../../../services/categoriesService';

function CreateMenuCategory() {
    const navigate = useNavigate();

    const onCreateCategory = async (values) => {
        await categoriesService.create(values);
        // TODO: What about list update after create?
        navigate('/categories');
    }
    const { values, onChange, onSubmit } = useForm({
        categoryName: "",
    }, onCreateCategory);

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formItemName">
                <Form.Label>Category Name</Form.Label>
                <Form.Control onChange={onChange} name="categoryName" type="text" placeholder="Enter category name" value={values?.categoryName} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreateMenuCategory;