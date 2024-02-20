import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const handleLogin = async (req, res) => {
    try {
        const query = { username: req.body.username };
        const user = await User.findOne(query);

        // Check if user exists
        if (!user)
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Invalid username or password',
            });

        // Check if the password is valid
        const valid = bcrypt.compareSync(req.body.password, user.password);
        if (!valid)
            return res.status(401).send({
                status: 'error',
                code: 401,
                message: 'Invalid username or password',
            });

        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

        res.status(200).json({
            status: 'success',
            data: {
                token: token,
            },
            message: 'Authentication successful'
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 'error',
            code: 500,
            message: e.message,
        });
    }
};

const handleSignup = async (req, res) => {
    try {
        if (req.body.username === '' || req.body.password === '')
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: "Username and password can not be empty"
            });

        const query = { username: req.body.username };
        const existingUser = await User.findOne(query);

        if (existingUser)
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Username already exists',
            });

        // Create new user
        const salt = await bcrypt.genSalt(15);
        const user = new User({
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, salt),
        });

        await user.save().then((result) => {
            console.log(`User document was inserted with _id: ${result._id}`);
            res.status(201).json({
                status: 'success',
                message: 'Registration successful',
            });
        })
        .catch((e) => {
            res.status(400).json({
                status: 'error',
                code: 400,
                message: e.message,
            });
        });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({
            status: 'error',
            code: 500,
            message: e.message,
        });
    }
};

export { handleLogin, handleSignup };
