const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    console.log("run")
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    message: "Invalid token"
                }
            }) 
        }

        next();
    });
}

module.exports={checkToken}