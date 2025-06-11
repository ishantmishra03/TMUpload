
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
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}