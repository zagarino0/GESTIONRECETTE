const data = {
    users: require('../../model/user/user.json'),
    setUsers: function (data) { this.users = data },
    immatriculations: require('../../model/user/immatriculation.json'),
    setImmatriculations: function (data) { this.immatriculations = data },
    recettes: require('../../model/user/recette.json'),
    setRecettes: function (data) { this.recettes = data },
    gestions: require('../../model/user/gestion.json'),
    setGestions: function (data) { this.gestions = data }
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
    const recette_prise_charge = req.body.recette_prise_charge;
    const compte = req.body.compte;

    const gestion_debut_nif = req.body.gestion_debut_nif;
    const gestion_modification = req.body.gestion_modification;
    const gestion_prise_charge = req.body.gestion_prise_charge;
    const gestion_fin_nif = req.body.gestion_fin_nif;

    const immatriculation_creation = req.body.immatriculation_creation;
    const immatriculation_prise_charge = req.body.immatriculation_prise_charge;
    const code = req.body.code;
    const mdp = req.body.mdp;


    if (!code || !mdp) return res.status(400).json({ 'message': 'code and password are required' });
    //check for duplicate usernames in the db
    const duplicate = data.users.find(person => person.code === code);
    if (duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(mdp, 10);
        //id
        let id = data.users.length === 0 ? 1 : data.users[data.users.length - 1].id + 1;
        //store the new user
        const newUser = {
            'id': id,
            'nom': nom,
            'prenom': prenom,
            'fonction': fonction,
            'compte': compte,
            'code': code,
            'mot_de_passe': hashedPwd
        };
        const newImmatriculation = {
            'id_user': id,
            'immatriculation_creation': immatriculation_creation,
            'immatriculation_prise_charge': immatriculation_prise_charge
        }
        const newRecette = {
            'id_user': id,
            'recette_creation': recette_creation,
            'recette_modification': recette_modification,
            'recette_visualisation': recette_visualisation,
            'recette_prise_charge': recette_prise_charge
        }

        const newGestion = {
            'id_user': id,
            'gestion_debut_nif': gestion_debut_nif,
            'gestion_prise_charge': gestion_prise_charge,
            'gestion_modification': gestion_modification,
            'gestion_fin_nif': gestion_fin_nif,
        }

        data.setUsers([...data.users, newUser]);
        data.setImmatriculations([...data.immatriculations, newImmatriculation]);
        data.setRecettes([...data.recettes, newRecette]);
        data.setGestions([...data.gestions, newGestion]);
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
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'gestion.json'),
            JSON.stringify(data.gestions)
        )

        //-----------sending data---------------
        let allData = [];
        data.users.map((user) => {
            data.immatriculations.map((im) => {
                data.recettes.map((rec) => {
                    data.gestions.map((ges) => {
                        if (user.id === im.id_user && rec.id_user === user.id && ges.id_user === user.id) {
                            allData.push({ ...user, ...im, ...rec, ...ges });
                        }
                    })
                })
            })
        })
        res.json(allData);
        allData = [];
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}


const handleLogin = async (req, res) => {
    const code = req.body.code;
    const mdp = req.body.mdp;

    if (!code || !mdp) return res.status(400).json({ 'message': 'code and password are required' });
    const foundUser = data.users.find(person => person.code === code);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(mdp, foundUser.mot_de_passe);
    if (match) {
        const accessToken = jwt.sign(
            { "code": foundUser.code },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "code": foundUser.code },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = data.users.filter(person => person.code !== foundUser.code);
        let currentUser = { ...foundUser, refreshToken };
        data.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user', 'user.json'),
            JSON.stringify(data.users)
        );
        data.gestions.find(gest => {
            if(gest.id_user === currentUser.id){
                currentUser = {...currentUser, ...gest}
            }
        })

        data.immatriculations.find(im => {
            if(im.id_user === currentUser.id)
                currentUser = {...currentUser, ...im};
        })

        data.recettes.find(rec => {
            if(rec.id_user === currentUser.id)
                currentUser = {...currentUser, ...rec};
        })
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', sercure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ "code": code, "username": ( currentUser.nom + " " + currentUser.prenom ), "login": true, ...currentUser});
    } else {
        res.status(401).json({ "login": false, "message": "Verifier bien votre code d'identification et mot de passe" });
    }
}


const handleGetAllUser = (req, res) => {
    let allData = [];
    data.users.map((user) => {
        data.immatriculations.map((im) => {
            data.recettes.map((rec) => {
                data.gestions.map((ges) => {
                    if (user.id === im.id_user && rec.id_user === user.id && ges.id_user === user.id) {
                        allData.push({ ...user, ...im, ...rec, ...ges });
                    }
                })
            })
        })
    })
    res.json(allData);
    allData = [];
}

const handleGetUserByCode = (req, res) => {
    const code = req.params.code;
    const user = data.users.find(person => person.code === code);
    if (!user) return res.status(404).json({ "message": `user ${code} not found` });
    const gestion = data.gestions.find(ges => ges.id_user === user.id);
    const immatriculation = data.immatriculations.find(im => im.id_user === user.id);
    const recette = data.recettes.find(rec => rec.id_user === user.id);
    res.json({ ...user, ...gestion, ...immatriculation, ...recette });
}

const handleUpdateUser = async (req, res) => {
    const id = req.params.id;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const fonction = req.body.fonction;

    const recette_creation = req.body.recette_creation;
    const recette_modification = req.body.recette_modification;
    const recette_visualisation = req.body.recette_visualisation;
    const recette_prise_charge = req.body.recette_prise_charge;

    const compte = req.body.compte;

    const gestion_debut_nif = req.body.gestion_debut_nif;
    const gestion_prise_charge = req.body.gestion_prise_charge;
    const gestion_modification = req.body.gestion_modification;
    const gestion_fin_nif = req.body.gestion_fin_nif;

    const immatriculation_creation = req.body.immatriculation_creation;
    const immatriculation_prise_charge = req.body.immatriculation_prise_charge;
    const code = req.body.code;

    const user = data.users.find(person => person.id === parseInt(id));
    if (!user) return res.status(404).json({ "message": `user ${code} not found` });

    const gestion = data.gestions.find(ges => ges.id_user === user.id);
    const immatriculation = data.immatriculations.find(im => im.id_user === user.id);
    const recette = data.recettes.find(rec => rec.id_user === user.id);

    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;
    if (fonction) user.fonction = fonction;
    if (compte) user.compte = compte;

    recette.recette_creation = recette_creation;
    recette.recette_modification = recette_modification;
    recette.recette_visualisation = recette_visualisation;
    recette.recette_prise_charge = recette_prise_charge;

    if (gestion_debut_nif) gestion.gestion_debut_nif = gestion_debut_nif;
    if (gestion_fin_nif) gestion.gestion_fin_nif = gestion_fin_nif;
    gestion.gestion_modification = gestion_modification;
    gestion.gestion_prise_charge = gestion_prise_charge;

    immatriculation.immatriculation_creation = immatriculation_creation;
    immatriculation.immatriculation_prise_charge = immatriculation_prise_charge;

    const filteredUsers = data.users.filter(person => person.code !== code);
    const unsortedUsers = [...filteredUsers, user];
    data.setUsers(unsortedUsers.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    const filteredRecettes = data.recettes.filter(rec => rec.id_user !== user.id);
    const unsortedRecettes = [...filteredRecettes, recette];
    data.setRecettes(unsortedRecettes.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    const filteredGestions = data.gestions.filter(ges => ges.id_user !== user.id);
    const unsortedGestions = [...filteredGestions, gestion];
    data.setGestions(unsortedGestions.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    const filteredImmatriculations = data.immatriculations.filter(im => im.id_user !== user.id);
    const unsortedImmatriculations = [...filteredImmatriculations, immatriculation];
    data.setImmatriculations(unsortedImmatriculations.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));


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
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'user', 'gestion.json'),
        JSON.stringify(data.gestions)
    )

    let allData = [];
    data.users.map((user) => {
        data.immatriculations.map((im) => {
            data.recettes.map((rec) => {
                data.gestions.map((ges) => {
                    if (user.id === im.id_user && rec.id_user === user.id && ges.id_user === user.id) {
                        allData.push({ ...user, ...im, ...rec, ...ges });
                    }
                })
            })
        })
    })
    res.json(allData);
    allData = [];
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
        res.json({ "success": "password has changed" });
    }
    else {
        res.json({ "message": "password doesn't match" });
    }

}

const handleDeleteUser = async (req, res) => {
    const id = req.params.id;

    const user = data.users.find(person => person.id === parseInt(id));


    if (!user) {
        res.status(400).json({ 'message': 'user not found' });
    }

    const filteredUsers = data.users.filter(person => person.code !== user.code);
    data.setUsers([...filteredUsers]);

    const filteredRecettes = data.recettes.filter(rec => rec.id_user !== user.id);
    data.setRecettes([...filteredRecettes]);

    const filteredGestions = data.gestions.filter(ges => ges.id_user !== user.id);
    data.setGestions([...filteredGestions]);

    const filteredImmatriculations = data.immatriculations.filter(im => im.id_user !== user.id);
    data.setImmatriculations([...filteredImmatriculations]);


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
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'user', 'gestion.json'),
        JSON.stringify(data.gestions)
    )
    res.json({ 'success': "user has been deleted" });
}

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = data.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //forbidden
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.code !== decoded.code) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "code": decoded.code },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    )

}

const handleLogout = async (req, res) => {
    // on client also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    const foundUser = data.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(403); //forbidden
    }
    // Delete refreshToken in db
    const otherUsers = data.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
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
    handleGetAllUser,
    handleGetUserByCode,
    handleUpdateUser,
    handleUpdatePassword,
    handleDeleteUser,
    handleRefreshToken,
    handleLogout
};