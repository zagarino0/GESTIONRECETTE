const data = {
    clients: require('../../../../e-immatriculation/backend/model/client.json'),
    charges: require('../../model/immatriculation/charge.json'),
    setCharges: function (data) { this.charges = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const priseCharge = async (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const client = data.clients.find(cli => cli.nif === reference_fiscal);
    const charge = data.charges.find(cha => cha.reference_fiscal === reference_fiscal);

    if(charge){
        res.json(data.charges);
    }else if(client){
        const newCharge = {
            'reference_fiscal': reference_fiscal,
            'prise_charge': true
        }
        let table = [];
        data.setCharges([...data.charges, newCharge]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'immatriculation', 'charge.json'),
            JSON.stringify(data.charges)
        );

        res.json([{...client, ...charge}])
    }else   
        res.json(data.charges);
        
}


module.exports = {
    priseCharge
}