import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import './Login.css';

const Login = ({ setToken }) => {
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [Message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const apiDomain = process.env.REACT_APP_API_DOMAIN;

    const handleLoginClick = async () => {
        setLoading(true);

        const loginEndpoint = `${apiDomain}/auth/login`;
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        };

        await fetch(loginEndpoint, payload).then(async (response) => {
            const jsonResponse = await response.json();

            if (response.status === 200) {
                const token = "Bearer " + jsonResponse.data.token
                
                setToken(token);
                localStorage.setItem('token', token);
            }
            else if (response.status === 401) {
                setLoading(false);
                setMessage(jsonResponse.message);
                setShowMessage(true);
            }
        });
    };

    const handleSignupClick = async () => {
        setLoading(true);

        const signupEndpoint = `${apiDomain}/auth/signup`;
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        };

        await fetch(signupEndpoint, payload).then(async (response) => {
            const jsonResponse = await response.json();

            setLoading(false);
            setMessage(jsonResponse.message);
            setShowMessage(true);
        });
    };

    return(
        <Form className='login-form'>
            {showMessage && <Alert variant='info'>{Message}</Alert>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-muted">
                    You can use this form to sign up. Please use a password that you don't use anywhere else! This is just a demo and is not very secure, so no sensitive information should be used.
                </Form.Text>
            </Form.Group>
            <div className='login-form-buttons'>
                <Button onClick={handleLoginClick} className='login'>
                    Login
                </Button>
                {
                    loading && 
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                <Button onClick={handleSignupClick} className='signup'>
                    Signup
                </Button>
            </div>
        </Form>
    );
};

export default Login;
