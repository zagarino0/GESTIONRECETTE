const data = {
    clients: require("../../../../e-immatriculation/backend/model/client.json"),

    activites: require("../../../../e-immatriculation/backend/model/activite.json"),
    actionnaires: require("../../../../e-immatriculation/backend/model/actionnaire.json"),
    dirigeants: require("../../../../e-immatriculation/backend/model/dirigeant.json"),
    interlocuteurs: require("../../../../e-immatriculation/backend/model/interlocuteur.json"),
    assujetissements: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    sieges: require("../../../../e-immatriculation/backend/model/siege.json"),
    coordonnees: require("../../../../e-immatriculation/backend/model/coordonnees.json"),
    etablissements: require("../../../../e-immatriculation/backend/model/etablissement.json"),
    autres: require("../../../../e-immatriculation/backend/model/autre.json"),

    charges: require("../../model/immatriculation/charge.json")
};

const getClientDate = (req, res) => {
    const date_init = req.body.date_init;
    const date_fin = req.body.date_fin;
    const contribuable = [];
    const contribuables = [];
    if (!date_debut || !date_fin)
        return res.status(404).json({ 'message': 'Aucun contribuable' });
    if (!date_debut || date_fin)
        return res.status(404).json({ 'message': 'Aucun contribuable' });
    data.clients.map(cli => {
        data.charges.map(cha => {
            if (cli.regime_fiscal === cha.reference_fiscal && (new Date(cha.date_prise_charge)) >= (new Date(date_init)) && (new Date(cha.date_prise_charge)) <= (new Date(date_fin)))
                contribuable.push({ ...cli, ...cha });
        })
    })
    contribuable.map(con => {
        data.activites.map(acti => {
            data.actionnaires.map(act => {
                data.dirigeants.map(dir => {
                    data.interlocuteurs.map(inter => {
                        data.assujetissements.map(ass => {
                            data.sieges.map(sie => {
                                data.coordonnees.map(coo => {
                                    data.etablissements.map(eta => {
                                        data.autres.map(aut => {
                                            if((new Date(con.date_prise_charge)) >= (new Date(date_init)) && (new Date(don.date_prise_charge)) <= (new Date(date_fin)) && acti.id_contribuable === con.id && act.id_contribuable === con.id && dir.id_contribuable === con.id && inter.id_contribuable === con.id && ass.id_contribuable === con.id && sie.id_contribuable === con.id && coo.id_contribuable === con.id && eta.id_contribaueble === con.id && aut.id_contribaueble === con.id)
                                                contribuables.push({...con, ...acti, ...act, ...dir, ...inter, ...ass, ...sie, ...coo, ...eta, ...aut});
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    res.json(contribuables);
}

module.exports = {
    getClientDate
}