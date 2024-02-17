import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Notes from './Notes';

const Main = ({ token }) => {
    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Notes</Navbar.Brand>
                </Container>
            </Navbar>
            <Notes token={token} />
        </>
    );
};

export default Main;
