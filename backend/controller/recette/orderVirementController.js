const getDataExcel = require('../../utils/ExcelData');
const data = {
    client: require('../../../../e-immatriculation/backend/model/client.json'),
    charge: require('../../model/immatriculation/charge.json'),
    ordre: require('../../model/recette/ordre_virement.json'),
    setOrdre: function (data) { this.ordre = data}
}

const path = require('path');
const fsPromises = require('fs').promises;


const setOrdreVirement = async (req, res) => {

    const id = data.modePayment.length === 0 ? 1 : data.modePayment[data.modePayment.length - 1].id + 1;
    
    const numero_impot = req.body.numero_impot;
    const annee = req.body.annee;
    const base_impot = req.body.base_impot;
    const montant_a_payer = req.body.montant_a_payer;
    const montant_verser = req.body.montant_verser;
    const reste_a_payer = req.body.reste_a_payer;

    const type_payment = req.body.type_payment;

    const numero_cheque = req.body.numero_cheque;
    const code_banque = req.body.code_banque;

    const numero_recepisse = req.body.numero_recepisse;

    const periode = req.body.periode;

    const transporteur = req.body.transporteur;

    const periode1 = req.body.periode1;
    const periode2 = req.body.periode2;

    const reference_fiscal = req.body.reference_fiscal;

    const numero_compte = req.body.numero_compte;

    const payment = {
        "id": id,
        "reference_fiscal": reference_fiscal,
        "numero_impot": numero_impot,
        "annee": annee,
        "base_impot": base_impot,
        "montant_a_payer": montant_a_payer,
        "montant_verser": montant_verser,
        "reste_a_payer": reste_a_payer,
        "type_payment": type_payment,
        "numero_compte": numero_compte,
        "numero_cheque": numero_cheque,
        "code_banque": code_banque,
        "transporteur": transporteur,
        "numero_recepisse": numero_recepisse,
        "periode": periode,
        "periode1": periode1,
        "periode2": periode2,
        "date_creation": new Date()
    }

    data.setModePayment([...data.modePayment, payment]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'recette', 'mode_payment.json'),
        JSON.stringify(data.modePayment)
    )

    res.status(200).json(data.json);
}

const setAvisDeCredit = (req, res) => {
    const id = data.ordre.length === 0 ? 1 : data.ordre[data.ordre.length - 1].id + 1;
    const numero_bordereau = req.body.numero_bordereau;
    const date_bordereau = req.body.date_bordereau;
    const date_valeur = req.body.date_valeur;
    const montant_total = req.body.montant_total;
    const montant_exporte = req.body.montant_exporte;
    const montant_restant = req.body.montant_restant;

    const avis = {
        "id": id,
        "numero_bordereau": numero_bordereau,
        "date_bordereau": date_bordereau,
        "date_valeur": date_valeur,
        "montant_total": montant_total,
        "montant_exporte": montant_exporte,
        "montant_restant": montant_restant
    }

    data.setOrdre([...data.ordre, avis]);
    
    fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'recette', 'ordre_virement.json'),
        JSON.stringify(data.modePayment)
    )
}

const getAvisDeCreditByNumBordereau = (req, res) => {
    const numero_bordereau = req.body.numero_bordereau;

    const avis = data.ordre.find(or => or.numero_bordereau === numero_bordereau);

    if(!avis){
        return res.status(401).json({'message': 'bordereau introuvable'});
    }
    res.json(avis);
}


const setOrdreClient = (req, res) => {

}

module.exports = {
    setOrdreVirement,
    setAvisDeCredit,
    getAvisDeCreditByNumBordereau,
    setOrdreClient
}