import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Notes from './Notes';
import './Main.css';
import { useCallback } from 'react';

const Main = ({ token, setToken }) => {
    const handleLogoutAndTokenExpiry = useCallback(() => {
        localStorage.removeItem('token');
        setToken('');
    }, [setToken]);

    return(
        <div className='main-container'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Notes</Navbar.Brand>
                    <Button onClick={handleLogoutAndTokenExpiry}>
                        Logout
                    </Button>
                </Container>
            </Navbar>
            <Notes token={token} handleTokenExpiry={handleLogoutAndTokenExpiry} />
        </div>
    );
};

export default Main;
