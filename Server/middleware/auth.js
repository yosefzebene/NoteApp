import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token)
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: "No Token Provided"
        });

    try {
        const decode = jwt.verify(token.split(" ")[1], process.env.JWT_PRIVATE_KEY);
        req.user = decode;
    }
    catch (e) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Token expired or invalid'
        });
    }

    next();
};
