import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided' })
    }
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.slice(7, authHeader.length);
        jwt.verify(token, process.env.CHIAVE_JWT, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid Token' })
            }
            req.user = user;
            next();
        });
    } catch (error) {

        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}

  