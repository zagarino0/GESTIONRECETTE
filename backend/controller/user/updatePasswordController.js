const data = {
    users: require('../../model/user/user.json'),
    setUsers: function (data) { this.users = data }
}


const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


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

module.exports = {
    handleUpdatePassword
}