import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateMenuCategory({values, onChange, onSubmit}) {

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