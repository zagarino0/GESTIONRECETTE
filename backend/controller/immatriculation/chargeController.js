const data = {
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    charges: require("../../model/immatriculation/charge.json"),
    assujetissements: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    setCharges: function (data) { this.charges = data }
};

const fsPromises = require('fs').promises;
const path = require('path');

const addnewClient = async (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const client = data.clients.find(cli => cli.nif === reference_fiscal);
    const charge = data.charges.find(cha => cha.reference_fiscal === reference_fiscal);

    if(charge){
        return res.json(data.charges);
    }else if(client){
        const newCharge = {
            'reference_fiscal': reference_fiscal,
            'prise_charge': true
        }
        let table = [];
        
        data.setCharges([...data.charges, newCharge]);
        res.json({...client, ...charge})

        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'immatriculation', 'charge.json'),
            JSON.stringify(data.charges)
        );

    }else   
        return res.json(data.charges);
}

const getClient = (req, res) => {
    const reference_fiscal = req.params.nif;
    let client = {};
    data.clients.map(cli => {
        data.charges.map(cha => {
            if(cli.nif === reference_fiscal && cli.nif === cha.reference_fiscal){
                client = cli;
            }
        })
    })
    if(!client)
        return res.json(data.clients);
    res.json(client);
    client = {};
}

const getClientByStatistique = () => {
    const numero_statistique = req.params.statistique;
    const client = data.clients.find(cli => cli.numero_statistique === numero_statistique);
    if(!client)
        return res.json({"message": "not found"});
    res.json(client);
}

const getClientByCin = () => {
    const cin = req.params.cin;
    const client = data.clients.find(cli => cli.cin === cin);
    if(!client)
        return res.json({"message": "not found"});
    res.json(client);
}

module.exports = {
    addnewClient,
    getClientByStatistique,
    getClientByCin,
    getClient
}