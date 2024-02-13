import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String
    }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    notes: {
        type: [noteSchema]
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
