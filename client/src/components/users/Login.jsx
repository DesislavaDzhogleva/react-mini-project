import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm}  from "../../hooks/useForms";
import { useAuth } from '../../hooks/useAuth';

function Login() {

    const {login, state} = useAuth();
    console.log('Login state: ' + state.isAuthenticated)
    
    //podavai nachalni stoinosti na formata, inache gyrmi
      const { values, onChange, onSubmit } = useForm({
        email: "",
        password: "",
      }, login);
  
  return (
    <section>
        <div className="container aos-init aos-animate" data-aos="fade-up">
            <div className="section-title">
                <h2>Existing User</h2>
                <p>Login</p>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={onChange}  value={values?.email}/>
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={onChange} value={values?.password}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    </Form>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Login;