import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASS) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        let token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.json({ success: true, message: "LoggedIn Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({ success: true, message: "Authenticated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}