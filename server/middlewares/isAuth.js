import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.send(404).json({ message: "Token Not Found" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        req.userId = decoded.id;
        next()
    } catch (e) {
        return res.status(401).json({ message: "Invalid Token" })
    }
}

export default isAuth;
