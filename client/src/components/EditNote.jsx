import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { editNote } from '../services/API';
import './EditNote.css';

const EditNote = ({ note, setDisplayingSingleNote, token }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        setTitle(note.title);
        setText(note.text)
    }, [note])

    const handleSaveClick = async () => {
        await editNote(note._id, title, text, token);
        setDisplayingSingleNote(false);
    };

    return (
        <Form className='edit-note-form'>
            <Form.Group className="title-section">
                <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="text-section">
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </Form.Group>

            <Button onClick={handleSaveClick}>Save</Button>
        </Form>
    );
};

export default EditNote;
