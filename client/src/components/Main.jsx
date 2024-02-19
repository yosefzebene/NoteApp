import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Notes from './Notes';
import './Main.css';

const Main = ({ token, setToken }) => {
    const onLogoutClick = () => {
        localStorage.removeItem('access_token');
        setToken('');
    }

    return(
        <div className='main-container'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Notes</Navbar.Brand>
                    <Button onClick={onLogoutClick}>
                        Logout
                    </Button>
                </Container>
            </Navbar>
            <Notes token={token} />
        </div>
    );
};

export default Main;
