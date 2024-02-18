import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';
import EditNote from './EditNote';
import './Notes.css';

const Notes = ({ token }) => {
    const [singleNote, setSingleNote] = useState({});
    const [allNotes, setAllNotes] = useState([]);
    const [displayingSingleNote, setDisplayingSingleNote] = useState(false);

    useEffect(() => {
        const getAllNotes = async () => {
            const getAllNotesEndpoint = 'http://localhost:5000/users/me/notes';
            const payload = {
                headers: {
                    'x-auth-token': token
                },
            };

            await fetch(getAllNotesEndpoint, payload).then(async (response) => {
                const jsonResponse = await response.json();
                setAllNotes(jsonResponse.data);
            });
        };

        getAllNotes();
    }, [token, displayingSingleNote]);

    const getSingleNote = async (id) => {
        const getSingleNoteEndpoint = `http://localhost:5000/users/me/notes/${id}`;
        const payload = {
            headers: {
                'x-auth-token': token
            },
        };

        await fetch(getSingleNoteEndpoint, payload).then(async (response) => {
            const jsonResponse = await response.json();
            setSingleNote(jsonResponse.data);
        });
    };

    const createNote = async () => {
        const createNoteEndpoint = `http://localhost:5000/users/me/notes`;
        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                title: 'New note',
                text: ''
            })
        };

        await fetch(createNoteEndpoint, payload).then(async (response) => {
            const jsonResponse = await response.json();
            setAllNotes(jsonResponse.data);
        });
    };

    const deleteNote = async () => {
        const deleteNoteEndpoint = `http://localhost:5000/users/me/notes/${singleNote._id}`
        const payload = {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            },
        };

        await fetch(deleteNoteEndpoint, payload);

        setDisplayingSingleNote(false);
    }

    const onNoteClick = (id) => {
        getSingleNote(id);
        setDisplayingSingleNote(true);
    };

    return (
        <Container fluid className='notes-container'>
            {
                displayingSingleNote ?
                <> 
                    <div className='edit-note-buttons-container'>
                        <Button onClick={() => setDisplayingSingleNote(false)}>Back</Button>
                        <Button onClick={deleteNote} className='delete-button'>Delete</Button>
                    </div>
                    <EditNote note={singleNote} setDisplayingSingleNote={setDisplayingSingleNote} token={token} />
                </>
                :
                <>
                    <Row>
                        <Col>
                            <Button onClick={() => createNote()}>New Note</Button>
                        </Col>
                    </Row>
                    <Row>
                        {
                            allNotes.map(note => {
                                return (
                                    <Col key={note._id} xs={6} sm={6} md={3} lg={3} xl={3} className='notes-column'>
                                        <NoteItem data={note} clickHandler={onNoteClick} />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </>
            }
        </Container>
    );
};

export default Notes;
