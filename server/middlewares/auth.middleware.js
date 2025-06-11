import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            next();
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Token is invalid or expired" })
    }
};

export default auth;