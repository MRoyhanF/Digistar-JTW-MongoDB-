import jwt from "jsonwebtoken";
import {blacklist} from "../config/blacklist.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Token is required' });
    }

    if (blacklist.includes(token)) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Sorry token has been revoked' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized', message: 'Token is required' });
            }
            return res.status(403).json({ error: 'Unauthorized', message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};