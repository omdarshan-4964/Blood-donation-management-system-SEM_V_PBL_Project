const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            message: 'No token provided'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    });
};

const verifyRole = (roles) => (req, res, next) => {
    if(!roles.includes(req.role)) {
        return res.status(403).json({
            message: 'Access denied'
        });
    }
    next();
};

module.exports = { verifyToken, verifyRole};