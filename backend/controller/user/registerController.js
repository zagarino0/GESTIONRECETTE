const data = {
    users: require('../../model/user/user.json'),
    setUsers: function (data) { this.users = data },
    immatriculations: require('../../model/user/immatriculation.json'),
    setImmatriculations: function (data) { this.immatriculations = data },
    recettes: require('../../model/user/recette.json'),
    setRecettes: function (data) { this.recettes = data }
}

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

module.exports = { handleNewUser };