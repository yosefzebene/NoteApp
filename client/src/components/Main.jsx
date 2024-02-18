import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Notes from './Notes';
import './Main.css';

const Main = ({ token }) => {
    return(
        <div className='main-container'>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Notes</Navbar.Brand>
                </Container>
            </Navbar>
            <Notes token={token} />
        </div>
    );
};

export default Main;
