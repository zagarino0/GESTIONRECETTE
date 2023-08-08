const data = {
    users: require('../../model/user/user.json'),
    setUsers: function (data) { this.users = data },
    immatriculations: require('../../model/user/immatriculation.json'),
    setImmatriculations: function (data) { this.immatriculations = data },
    recettes: require('../../model/user/recette.json'),
    setRecettes: function (data) { this.recettes = data }
}

const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const fonction = req.body.fonction;
    const recette_creation = req.body.recette_creation;
    const recette_modification = req.body.recette_modification;
    const recette_visualisation = req.body.recette_visualisation;
    const compte = req.body.compte;
    const gestion = req.body.gestion;
    const immatriculation_creation = req.body.immatriculation_creation;
    const immatriculation_prise_charge = req.body.immatriculation_prise_charge;
    const code = req.body.code;
    const mdp = req.body.mdp;


    if(!code || !mdp) return res.status(400).json({ 'message': 'code and password are required'});
    //check for duplicate usernames in the db
    const duplicate = data.users.find(person => person.code === code);
    if(duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(mdp, 10);
        //id
        let id = data.users[data.users.length - 1 ].id + 1;
        //store the new user
        const newUser = {
            'id': id,
            'nom': nom,
            'prenom': prenom,
            'fonction': fonction,
            'compte': compte,
            'gestion': gestion,
            'code': code, 
            'mot_de_passe': hashedPwd 
        };
        const newImmatriculation = {
            'id_user': id,
            'creation_immatriculation': immatriculation_creation,
            'prise_en_charge_immatriculation': immatriculation_prise_charge
        }
        const newRecette = {
            'id_user': id,
            'creation_recette': recette_creation,
            'modification_recette': recette_modification,
            'visualisation_recette': recette_visualisation
        }

        data.setUsers([...data.users, newUser]);
        data.setImmatriculations([...data.immatriculations, newImmatriculation]);
        data.setRecettes([...data.recettes, newRecette]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'user.json'),
            JSON.stringify(data.users)
        )
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'immatriculation.json'),
            JSON.stringify(data.immatriculations)
        )
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'recette.json'),
            JSON.stringify(data.recettes)
        )
        res.status(201).json({'success': `New user ${newUser.prenom} created` });
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
}


const handleLogin = async (req, res) => {
    const code = req.body.code;
    const mdp = req.body.mdp;

    if(!code || !mdp) return res.status(400).json({'message': 'code and password are required'});
    const foundUser = data.users.find(person => person.code === code);
    if(!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(mdp, foundUser.mot_de_passe);
    if(match){
        const accessToken = jwt.sign(
            {"code": foundUser.code},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
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
            path.join(__dirname, '..', '..', 'model', 'user', 'user.json'),
            JSON.stringify(data.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', sercure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

var allData = [];
const handleGetUser = (req, res) => {
    data.users.map((user) => {
        data.immatriculations.map((im) => {
            data.recettes.map((rec) => {
                if(user.id === im.id_user && rec.id_user === user.id){
                    allData.push({...user, ...im, ...rec});
                }
            })
        })
    })
    res.json(allData);
}


const handleUpdatePassword = async (req, res) => {
    const code = req.body.code;
    const password = req.body.password;
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);

    const user = data.users.find(us => us.code === code);
    if (!user) {
        return res.status(400).json({ 'message': 'user not found' });
    }

    const match = await bcrypt.compare(password, user.mot_de_passe);
    if (match) {
        user.mot_de_passe = newPassword;
        const filteredArray = data.users.filter(us => us.code !== code);
        const unsortedArray = [...filteredArray, user];
        data.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'user.json'),
            JSON.stringify(data.users)
        )
        res.json({"success": "password has changed"});
    }
    else{
        res.json({"message": "password doesn't match"});
    }

}

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

const handleLogout = async (req, res) => {
    // on client also delete the accessToken


    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    const foundUser = data.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(403); //forbidden
    }
    // Delete refreshToken in db
    const otherUsers = data.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    data.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'user', 'user.json'),
        JSON.stringify(data.users)
    );
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
    
}


module.exports = { 
    handleNewUser,
    handleLogin,
    handleGetUser,
    handleUpdatePassword,
    handleRefreshToken,
    handleLogout
};