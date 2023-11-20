const getDataExcel = require('../../utils/ExcelData');
const data = {
    client: require('../../../../e-immatriculation/backend/model/client.json'),
    modePayment: require('../../model/recette/mode_payment.json')
}

const path = require('path');

const getClientByNif = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;

    let client = data.client.find(cli => cli.nif === reference_fiscal);

    let modePayments = [];
    let impots = [];

    data.modePayment.map(pay => {
        if(pay.reference_fiscal === reference_fiscal)
            modePayments.push(pay);
    })

    modePayments.map(pay => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
            if(pay.numero_impot === imp.numero_impot){
                impots.push({...pay, ...imp});            
            }
        })
    })

    client.impots = impots;
    res.json(client);
    modePayments = [];
    impots = [];
}

const getRecetteBetweenTwoDate = (req, res) => {
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let impots = [];

    data.modePayment.map(mod => {
        if(mod.date_creation >= date_init && mod.date_creation <= date_fin && mod.montant_a_payer === mod.montant_verser)
            impots.push(mod);
    })

    res.json(impots);
    impots = [];
}

const getResteARecouvrerBetweenTwoDate = (req, res) => {
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;

    let impots = [];

    data.modePayment.map(mod => {
        if(mod.date_creation >= date_init && mod.date_creation <= date_fin && mod.reste_a_payer !== 0)
            impots.push(mod);
    })

    res.json(impots);
    impots = [];
}


module.exports = {
    getClientByNif,
    getRecetteBetweenTwoDate,
    getResteARecouvrerBetweenTwoDate
}