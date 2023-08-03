const data = {
    users: require('../../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');


const handleLogin = async (req, res) => {
    const code = req.body.code;
    const mdp = req.body.mot_de_passe;

    if(!code || !mdp) return res.status(400).json({'message': 'code and password are required'});
    const foundUser = data.users.find(person => person.code === code);
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(mdp, foundUser.mot_de_passe);
    if(match){
        const accessToken = jwt.sign(
            {"code": foundUser.code},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            {"code": foundUser.code},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = data.users.filter(person => person.code !== foundUser.code);
        const currentUser = {...foundUser, refreshToken};
        data.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user.json'),
            JSON.stringify(data.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', sercure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({'success': `User ${code} is logged in`});
    } else {
        res.sendStatus(401);
    }
}


module.exports = { handleLogin };