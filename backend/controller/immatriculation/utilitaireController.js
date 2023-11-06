const data = {
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    charges: require("../../model/immatriculation/charge.json")
};

const getClientDate = (req, res) => {
    const date_debut_exe = req.body.date_debut_exe_init;
    const date_fin_exe = req.body.date_fin_exe_fin;
    let client = [];

    data.clients.map(cli => {
        data.charges.map(charge => {
            if(cli.nif === charge.reference_fiscal)
                client.push({...cli, ...charge});
        })
    })

    res.json(client);
    client = [];
}

module.exports = {
    getClientDate
}