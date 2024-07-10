const data = {
    clients: require("../../../../e-immatriculation/backend/model/contribuable.json"),

    modifications: require('../../../../e-immatriculation/backend/model/modificationContribuable.json'),
    activites: require("../../../../e-immatriculation/backend/model/activite.json"),
    actionnaires: require("../../../../e-immatriculation/backend/model/actionnaire.json"),
    dirigeants: require("../../../../e-immatriculation/backend/model/dirigeant.json"),
    interlocuteurs: require("../../../../e-immatriculation/backend/model/interlocuteur.json"),
    assujetissements: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    sieges: require("../../../../e-immatriculation/backend/model/siege.json"),
    coordonnees: require("../../../../e-immatriculation/backend/model/coordonnees.json"),
    etablissements: require("../../../../e-immatriculation/backend/model/etablissement.json"),
    autres: require("../../../../e-immatriculation/backend/model/autre.json"),



    charges: require("../../model/immatriculation/charge.json"),
    setCharges: function (data) { this.charges = data }
};

const fsPromises = require('fs').promises;
const path = require('path');


const getAllContribuableValide = (req, res) => {
    const contribuable = data.clients.filter(con => con.actif);
    const contribuableValide = [];
    contribuable.map(con => {
        const modif = data.modifications.find(mod => mod.id_contribuable == con.id);
        if(!modif.blockage){
            con.actionnaire = data.actionnaires.length === 0 ? null : data.actionnaires.filter(act => act.id_contribuable === con.id);
            con.dirigeant = data.dirigeants.length === 0 ? null : data.dirigeants.filter(dir => dir.id_contribuable === con.id);
            con.activite = data.activites.length === 0 ? null : data.activites.find(act => act.id_contribuable === con.id);
            con.autre = data.autres.length === 0 ? null : data.autres.find(aut => aut.id_contribuable === con.id);
            // con.coordonnees = data.coordonnees.length === 0 ? null : data.coordonnees.find(coo => coo.id_contribuable === con.id);
            // con.etablissement = data.etablissements.length === 0 ? null : data.etablissements.filter(eta => eta.id_contribuable === con.id);
            // con.interlocuteur = data.interlocuteurs.length === 0 ? null : data.interlocuteurs.find(inter => inter.id_contribuable === con.id);
            // con.siege = data.siege.length === 0 ? null : data.siege.find(sie => sie.id_contribuable === con.id);
            // const vehicule = [];
            // data.vehicule.map(veh => {
            //     data.vehiculecontribuable.map(vdh => {
            //         if(vdh.reference_fiscal === con.reference_fiscal){
            //             vdh.id_vehicules.map(idvcl => {
            //                 if(idvcl === veh.id_vehicule)
            //                     vehicule.push(veh);
            //             })
            //         }
            //     })
            // })
            // con.vehicules = vehicule.length === 0 ? null : vehicule;
            // con.assujetissement = data.assujetissement.length === 0 ? null : data.assujetissement.filter(ass => ass.id_contribuable === con.id);
                        
            contribuableValide.push({...con});
        }
    })

    res.json(contribuableValide);
}


const addnewClient = async (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const client = data.clients.find(cli => cli.reference_fiscal === reference_fiscal);
    const charge = data.charges.find(cha => cha.reference_fiscal === reference_fiscal);

    if (charge) {
        return res.json({ 'message': 'Contribuable déjà pris en charge' });
    } else if (client && !charge) {
        const newCharge = {
            'reference_fiscal': reference_fiscal,
            'prise_charge': true,
            'date_prise_charge': new Date()
        }
        data.setCharges([...data.charges, newCharge]);
        res.json({ ...client, ...charge })
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'immatriculation', 'charge.json'),
            JSON.stringify(data.charges)
        );
    } else
        return res.json(data.charges);
}

const  getClient = (req, res) => {
    const reference_fiscal = req.params.reference_fiscal;
    let client = {};
    data.clients.map(cli => {
        data.charges.map(cha => {
            if (cli.reference_fiscal === reference_fiscal && cli.reference_fiscal === cha.reference_fiscal) {
                client = cli;
            }
        })
    })
    if (!client)
        return res.json(data.clients);
    res.json(client);
    client = {};
}

const getClientByStatistique = () => {
    const numero_statistique = req.params.statistique;
    const client = data.clients.find(cli => cli.numero_statistique === numero_statistique);
    if (!client)
        return res.json({ "message": "not found" });
    res.json(client);
}

const getClientByCin = () => {
    const cin = req.body.cin;
    const client = data.clients.find(cli => cli.cin === cin);
    if (!client)
        return res.json({ "message": "not found" });
    
    contribuable.actionnaire = data.actionnaires.length === 0 ? [] : data.actionnaires.filter(act => act.id_contribuable === contribuable.id);
    contribuable.dirigeant = data.dirigeants.length === 0 ? [] : data.dirigeants.filter(dir => dir.id_contribuable === contribuable.id);
    contribuable.activite = data.activites.length === 0 ? {} : data.activites.find(act => act.id_contribuable === contribuable.id);
    contribuable.etablissement = data.activites.length === 0 ? [] : data.etablissements.filter(eta => eta.id_contribuable === contribuable.id);
    contribuable.coordonnees = data.coordonnees.length === 0 ? {} : data.coordonnees.find(coo => coo.id_contribuable === contribuable.id);
    contribuable.siege = data.sieges.length === 0 ? {} : data.sieges.find(sie => sie.id_contribuable === contribuable.id);
    contribuable.autre = data.autres.length === 0 ? {} : data.autres.find(aut => aut.id_contribuable === contribuable.id);
    contribuable.interlocuteur = data.autres.length === 0 ? {} : data.interlocuteurs.find(inter => inter.id_contribuable === contribuable.id);

    res.json(client);
}

const getContribuableEnCharge = (req, res) => {
    const contribuables = data.clients;
    const contribuableEnCharge = [];

    contribuables.map(con => {
        data.charges.map(cha => {
            if(con.reference_fiscal === cha.reference_fiscal && cha.prise_charge){
                contribuableEnCharge.push(con);
            }
        })
    })

    res.json(contribuableEnCharge);
}




module.exports = {
    addnewClient,
    getClientByStatistique,
    getClientByCin,
    getClient,
    getAllContribuableValide,
    getContribuableEnCharge
}