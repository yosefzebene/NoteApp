import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

const Login = ({ setToken }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [Message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {
        const loginEndpoint = 'http://localhost:5000/auth/login';
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
                localStorage.setItem('access_token', token);
            }
            else if (response.status === 401) {
                setMessage(jsonResponse.message);
                setShowMessage(true);
            }
        });
    };

    const handleSignupClick = async () => {
        const signupEndpoint = 'http://localhost:5000/auth/signup';
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

            setMessage(jsonResponse.message);
            setShowMessage(true);
        });
    };

    return(
        <Form>
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
                    You can use this form to sign up.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" onClick={handleLoginClick}>
                Login
            </Button>
            <Button onClick={handleSignupClick}>
                Signup
            </Button>
        </Form>
    );
};

export default Login;
