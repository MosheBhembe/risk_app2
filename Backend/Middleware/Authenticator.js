const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        console.log("decoded token JWT", decodedToken);
        
        req.user = decodedToken;

        next();
    } catch (error) {
        return res.status(400).json({
            message: 'TOKEN IS INVALID'
        });
    }
}


module.exports = authenticateToken; 