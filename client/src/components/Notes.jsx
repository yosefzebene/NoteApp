import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import NoteItem from './NoteItem';
import EditNote from './EditNote';
import { getAllNotes, getSingleNote, createNote, deleteNote } from '../services/API';
import './Notes.css';

const Notes = ({ token }) => {
    const [singleNote, setSingleNote] = useState({});
    const [allNotes, setAllNotes] = useState([]);
    const [displayingSingleNote, setDisplayingSingleNote] = useState(false);

    useEffect(() => {
        const callGetAllNotes = async () => {
            const allNotes = await getAllNotes(token);

            setAllNotes(allNotes);
        };

        callGetAllNotes();
    }, [token, displayingSingleNote]);

    const onNoteClick = async (id) => {
        const result = await getSingleNote(id, token);
        setSingleNote(result);
        setDisplayingSingleNote(true);
    };

    const onCreateNoteClick = async () => {
        const result = await createNote(token);
        setAllNotes(result);
    };

    const onDeleteNoteClick = async () => {
        await deleteNote(singleNote._id, token);
        setDisplayingSingleNote(false);
    };

    return (
        <Container fluid className='notes-container'>
            {
                displayingSingleNote ?
                <> 
                    <div className='edit-note-buttons-container'>
                        <Button onClick={() => setDisplayingSingleNote(false)}>Back</Button>
                        <Button onClick={onDeleteNoteClick} className='delete-button'>Delete</Button>
                    </div>
                    <EditNote note={singleNote} setDisplayingSingleNote={setDisplayingSingleNote} token={token} />
                </>
                :
                <>
                    <Row>
                        <Col>
                            <Button onClick={onCreateNoteClick}>New Note</Button>
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
