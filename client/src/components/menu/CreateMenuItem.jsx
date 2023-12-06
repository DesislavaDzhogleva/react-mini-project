import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateMenuItem() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formItemName">
        <Form.Label>Meal Name</Form.Label>
        <Form.Control type="text" placeholder="Enter meal name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formItemDescription">
        <Form.Label>Meal Description</Form.Label>
        <Form.Control type="textarea" placeholder="Enter meal description" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateMenuItem;