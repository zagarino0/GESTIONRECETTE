const data = {
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    charges: require("../../model/immatriculation/charge.json")
};

const getClientDate = (req, res) => {
    const date_debut_exe = req.body.date_debut_exe_init;
    const date_fin_exe = req.body.date_fin_exe_fin;
    
    const client = data.charges.map((charge) => {
        data.clients.filter((dat) => {
            return dat.date_debut_exe > date_debut_exe && dat.date_debut_exe < date_fin_exe && dat.nif === charge.reference_fiscal;
        })
    })

    res.json(client);
}

module.exports = {
    getClientDate
}