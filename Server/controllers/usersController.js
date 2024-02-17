import User from '../models/User.js';

const getSingleNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        const note = user.notes.id(req.params.id);

        if (!note)
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: "Resource does not exists",
            });

        res.status(200).json({
            status: 'success',
            data: note
        })
    }
    catch (e) {
        console.log(e.message);
        res.status(400).json({
            status: 'error',
            code: 400,
            message: e.message
        });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        const notes = user.notes.sort((a, b) => {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
        });

        res.status(200).json({
            status: 'success',
            data: notes
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({
            status: 'error',
            code: 500,
            message: e.message
        });
    }
};

const createNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();

        const note = {
            title: req.body.title,
            text: req.body.text,
        }
        user.notes.push(note);
        await user.save();

        const result = user.notes.sort((a, b) => {
            return b.updatedAt.getTime() - a.updatedAt.getTime();
        });

        res.status(201).json({
            status: 'success',
            data: result
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'error',
            code: 400,
            message: e.message,
        });
    }
};

const modifyNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        const note = user.notes.id(req.params.id);

        if (!note)
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Resource does not exist",
            });

        note.title = req.body.title;
        note.text = req.body.text;
        await user.save();

        res.status(200).json({
            status: 'success',
            data: note
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(400).json({
            status: 'error',
            code: 400,
            message: e.message
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec();
        const note = user.notes.id(req.params.id);

        if (!note)
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Resource does not exist",
            });

        note.deleteOne();
        await user.save();

        res.status(200).json({
            status: 'success',
            data: note,
            message: note.title + "has been deleted",
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(400).json({
            status: 'error',
            code: 400,
            message: e.message,
        });
    }
};

export { getSingleNote, getAllNotes, createNote, modifyNote, deleteNote };
