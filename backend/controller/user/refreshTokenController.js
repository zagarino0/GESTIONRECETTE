const data = {
    users: require('../../model/user/user.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = data.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) return res.sendStatus(403); //forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.code !== decoded.code) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "code": decoded.code },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            res.json({ accessToken })
        }
    )
    
}


module.exports = { handleRefreshToken };