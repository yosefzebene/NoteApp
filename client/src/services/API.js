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

    var returnValue = [];
    await fetch(createNoteEndpoint, payload).then(async (response) => {
        const jsonResponse = await response.json();

        if (response.status === 201)
            returnValue = jsonResponse.data;

        if (response.status === 401)
            throw new Error('Unauthorized access');
    });

    return returnValue;
};

export const getSingleNote = async (id, token) => {
    const getSingleNoteEndpoint = `${apiDomain}${notesEndpoint}/${id}`;
    const payload = {
        headers: {
            'x-auth-token': token
        },
    };

    var returnValue = [];
    await fetch(getSingleNoteEndpoint, payload).then(async (response) => {
        const jsonResponse = await response.json();

        if (response.status === 200)
            returnValue = jsonResponse.data;

        if (response.status === 401)
            throw new Error('Unauthorized access');
    });

    return returnValue;
};

export const getAllNotes = async (token) => {
    const getAllNotesEndpoint = `${apiDomain}${notesEndpoint}`;
    const payload = {
        headers: {
            'x-auth-token': token
        },
    };

    var returnValue = [];
    await fetch(getAllNotesEndpoint, payload).then(async (response) => {
        const jsonResponse = await response.json();

        if (response.status === 200)
            returnValue = jsonResponse.data;

        if (response.status === 401)
            throw new Error('Unauthorized access');
    });

    return returnValue;
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

    await fetch(editNoteEndpoint, payload).then((response) => {
        if (response.status === 401)
            throw new Error('Unauthorized access');
    });
};

export const deleteNote = async (id, token) => {
    const deleteNoteEndpoint = `${apiDomain}${notesEndpoint}/${id}`
    const payload = {
        method: 'DELETE',
        headers: {
            'x-auth-token': token
        },
    };

    await fetch(deleteNoteEndpoint, payload).then((response) => {
        if (response.status === 401)
            throw new Error('Unauthorized access');
    });
};
