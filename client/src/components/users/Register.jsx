import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm}  from "../../hooks/useForms";
import { useAuth } from '../../hooks/useAuth';

function Register() {

    const {register, state} = useAuth();
    
    //podavai nachalni stoinosti na formata, inache gyrmi
      const { values, onChange, onSubmit } = useForm({
        firstName: "",
        lastName: "",
        role: "Client",
        email: "",
        password: "",
      }, register);
  
  return (
    <section>
        <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="section-title">
                <p>Register</p>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={onChange}  value={values?.firstName}/>
                        <Form.Text className="text-muted">
                       
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={onChange}  value={values?.lastName}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={onChange}  value={values?.email}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="role" onChange={onChange} value={values?.role}>
                            <option selected={values?.role === 'Client'}>Client</option>
                            <option selected={values?.role === 'Restaurant'}>Restaurant</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={onChange} value={values?.password}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    </Form>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Register;