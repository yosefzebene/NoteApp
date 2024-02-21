import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { editNote } from '../services/API';
import './EditNote.css';

const EditNote = ({ note, setSavedStatus, handleTokenExpiry, token }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        setTitle(note.title);
        setText(note.text);
    }, [note]);

    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            await editNote(note._id, title, text, token).catch(() => {
                handleTokenExpiry();
            });
            setSavedStatus(true);
        }, 800);

        setSavedStatus(false);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [note._id, token, setSavedStatus, handleTokenExpiry, title, text]);

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
        </Form>
    );
};

export default EditNote;
