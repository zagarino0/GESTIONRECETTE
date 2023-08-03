const data = {
    users: require('../../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const nom = req.body.firstname;
    const prenom = req.body.lastname;
    const numero_matricule = req.body.num_matricule;
    const type_operateur = req.body.type_operateur;
    const code = req.body.code;
    const mdp = req.body.mot_de_passe;

    if(!code || !mdp) return res.status(400).json({ 'message': 'code and password are required'});
    //check for duplicate usernames in the db
    const duplicate = data.users.find(person => person.code === code);
    if(duplicate) return res.sendStatus(409); // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(mdp, 10);
        //store the new user
        const newUser = {
            'id': data.users[data.users.length - 1 ].id + 1,
            'nom': nom,
            'prenom': prenom,
            'numero_matricule': numero_matricule,
            'type_operateur': type_operateur,
            'code': code, 
            'mot_de_passe': hashedPwd 
        };
        data.setUsers([...data.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'user.json'),
            JSON.stringify(data.users)
        )
        res.status(201).json({'success': `New user ${user} created` });
    } catch (error) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = { handleNewUser };