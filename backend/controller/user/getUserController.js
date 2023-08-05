const data = {
    users: require('../../model/user/user.json'),
    setUsers: function (data) { this.users = data },
    immatriculations: require('../../model/user/immatriculation.json'),
    setImmatriculations: function (data) { this.immatriculations = data },
    recettes: require('../../model/user/recette.json'),
    setRecettes: function (data) { this.recettes = data }
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

module.exports = {
    handleGetUser
}