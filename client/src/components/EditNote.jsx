import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditNote = ({ note, setDisplayingSingleNote, token }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        setTitle(note.title);
        setText(note.text)
    }, [note])

    const saveNote = async () => {
        const editNoteEndpoint = `http://localhost:5000/users/me/notes/${note._id}`
        const payload = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                title: title,
                text: text
            }),
        };

        await fetch(editNoteEndpoint, payload).then(async (response) => {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        });

        setDisplayingSingleNote(false);
    };

    const deleteNote = async () => {
        const deleteNoteEndpoint = `http://localhost:5000/users/me/notes/${note._id}`
        const payload = {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            },
        };

        await fetch(deleteNoteEndpoint, payload);

        setDisplayingSingleNote(false);
    }

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </Form.Group>

            <Button onClick={() => saveNote()}>Save</Button>
            <Button onClick={() => deleteNote()} variant='danger'>Delete</Button>
        </Form>
    );
};

export default EditNote;
