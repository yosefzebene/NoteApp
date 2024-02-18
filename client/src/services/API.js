const apiDomain = process.env.REACT_APP_API_DOMAIN;
const notesEndpoint = '/users/me/notes';

export const createNote = async (token) => {
    const createNoteEndpoint = `${apiDomain}${notesEndpoint}`;
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

    const response = await fetch(createNoteEndpoint, payload);
    const jsonResponse = await response.json();

    return jsonResponse.data;
};

export const getSingleNote = async (id, token) => {
    const getSingleNoteEndpoint = `${apiDomain}${notesEndpoint}/${id}`;
    const payload = {
        headers: {
            'x-auth-token': token
        },
    };

    const response = await fetch(getSingleNoteEndpoint, payload);
    const jsonResponse = await response.json();

    return jsonResponse.data;
};

export const getAllNotes = async (token) => {
    const getAllNotesEndpoint = `${apiDomain}${notesEndpoint}`;
    const payload = {
        headers: {
            'x-auth-token': token
        },
    };

    const response = await fetch(getAllNotesEndpoint, payload);
    const jsonResponse = await response.json();

    return jsonResponse.data;
};

export const editNote = async (id, title, text, token) => {
    const editNoteEndpoint = `${apiDomain}${notesEndpoint}/${id}`
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

    await fetch(editNoteEndpoint, payload);
};

export const deleteNote = async (id, token) => {
    const deleteNoteEndpoint = `${apiDomain}${notesEndpoint}/${id}`
    const payload = {
        method: 'DELETE',
        headers: {
            'x-auth-token': token
        },
    };

    await fetch(deleteNoteEndpoint, payload);
}
