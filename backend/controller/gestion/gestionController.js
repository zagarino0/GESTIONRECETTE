const getDataExcel = require('../../utils/ExcelData');
const data = {
    client: require('../../../../e-immatriculation/backend/model/client.json'),
    modePayment: require('../../model/recette/mode_payment.json')
}


const getClientByNif = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;

    let client = data.client.find(cli => cli.nif === reference_fiscal);

    let modePayments = [];
    let impots = [];

    data.modePayment.mep(pay => {
        if(pay.reference_fiscal === reference_fiscal)
            modePayments.push(pay);
    })

    modePayments.map(pay => {
        getDataExcel(path.join(__dirname, '..', '..', 'fixtures', 'code.xlsx'), 'code impot').map(imp => {
            if(pay.code_impot === imp.numero_impot)
                impots.push({...pay, ...imp});            
        })
    })

    client.impots = impots;
    res.json(client);
    modePayments = [];
    impots = [];
}



module.exports = {
    getClientByNif
}