import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided' })

    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) {
                return res.status(403).json({ message: 'Invalid Token' })
            }
            req.user = user;
            next();
        });
    } catch (error) {

        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}