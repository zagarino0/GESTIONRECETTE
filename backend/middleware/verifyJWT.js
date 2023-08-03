const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const autHeader = req.header('authorization')
    if(!autHeader) return res.sendStatus(401);
    console.log(autHeader); // Bearer token
    const token = autHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid token
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;