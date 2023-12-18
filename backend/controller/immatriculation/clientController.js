const data = {
    clients: require("../../../../e-immatriculation/backend/model/client.json"),
    assujetissement: require('../../../../e-immatriculation/backend/model/assujetissement.json'),
    setClients: function (data) { this.clients = data }
};

const fsPromises = require('fs').promises;


const getAllclients = (req, res) => {
    res.json(data.clients);
}

const getClientByReferenceFiscal = (req, res) => {
    const client = data.clients.find(cli => cli.nif === req.body.nif);
    res.json(client);
}

const addnewClient = async (req, res) => {
    
    const newClient = {
        "id": data.clients[data.clients.length - 1 ].id + 1 || 1,
        "nif": req.body.nif,
        "raison_sociale": req.body.raisonsocial,
        "nom_commerciale": req.body.nomcomm,
        "type": req.body.type,
        "forme_juridique": req.body.formjuri,
        "regime_fiscal": req.body.regfisc,
        "date_agrement": req.body.dateagrem,
        "reference_agrement": req.body.refagrem,
        "periode_grace": req.body.periodgra,
        "date_creation": req.body.datecreation,
        "capital": req.body.capital,
        "activite": req.body.activite,
        "precision_activite": req.body.precactivite,
        "date_demande_modif": req.body.datedemandemodif,
        "date_attribution_nif": req.body.dateattribnif,
        "registre_commerce": req.body.regcomm,
        "date_registre": req.body.datereg,
        "numero_statistique": req.body.numstat,
        "delivree_le": req.body.datedelivre,
        "date_debut_exe": req.body.datedebutexe,
        "date_cloture_exe": req.body.dateclotexe,
        "resident": req.body.resident,
        "exportateur": req.body.exportateur,
        "importateur": req.body.importateur,
        "rib": req.body.rib,
        "province": req.body.province,
        "region": req.body.region,
        "district": req.body.district,
        "commune": req.body.commune,
        "fokontany": req.body.fokontany,
        "adresse": req.body.adress,
        "nombre_salarie": req.body.nbsalarie,
        "proprietaire": req.body.proprietaire,
        "type_demande": req.body.typedemande,
        "date_acte": req.body.dateacte,
        "date_accord": req.body.dateacc,
        "titre": req.body.titre
    }

    if(!newClient.nif){
        return res.status(400).json({'message': 'nif is required'})
    }
    data.setClients([...data.clients, newClient]);
    res.json(data.clients);
}

const updateClient = async (req, res) => {
    const client = data.clients.find(cli => cli.nif === req.body.nif);
    if(!client){
        return res.status(400).json({'message': 'client not found'});
    }
    
    if(req.body.nif) client.nif = req.body.nif;
    if(req.body.raisonsocial) client.raison_sociale = req.body.raisonsocial;
    if(req.body.nomcomm) client.nom_commerciale = req.body.nomcomm;
    if(req.body.type) client.type = req.body.type;
    if(req.body.formjuri) client.forme_juridique = req.body.formjuri;
    if(req.body.regfisc) client.regime_fiscal = req.body.regfisc;
    if(req.body.dateagrem) client.date_agrement = req.body.dateagrem;
    if(req.body.refagrem) client.reference_agrement = req.body.refagrem;
    if(req.body.periodgra) client.periode_grace = req.body.periodgra;
    if(req.body.datecreation) client.date_creation = req.body.datecreation;
    if(req.body.capital) client.capital = req.body.capital;
    if(req.body.activite) client.activite = req.body.activite;
    if(req.body.precactivite) client.precision_activite = req.body.precactivite;
    if(req.body.datedemandemodif) client.date_demande_modif = req.body.datedemandemodif;
    if(req.body.dateattribnif) client.date_attribution_nif = req.body.dateattribnif;
    if(req.body.regcomm) client.registre_commerce = req.body.regcomm;
    if(req.body.datereg) client.date_registre = req.body.datereg;
    if(req.body.numstat) client.numero_statistique = req.body.numstat;
    if(req.body.datedelivre) client.delivree_le = req.body.datedelivre;
    if(req.body.datedebutexe) client.date_debut_exe = req.body.datedebutexe;
    if(req.body.dateclotexe) client.date_cloture_exe = req.body.dateclotexe;
    if(req.body.resident) client.resident = req.body.resident;
    if(req.body.exportateur) client.exportateur = req.body.exportateur;
    if(req.body.importateur) client.importateur = req.body.importateur;
    if(req.body.rib) client.rib = req.body.rib;
    if(req.body.province) client.province = req.body.province;
    if(req.body.region) client.region = req.body.region;
    if(req.body.district) client.district = req.body.district;
    if(req.body.commune) client.commune = req.body.commune;
    if(req.body.fokontany) client.fokontany = req.body.fokontany;
    if(req.body.adress) client.adresse = req.body.adress;
    if(req.body.nbsalarie) client.nombre_salarie = req.body.nbsalarie;
    if(req.body.proprietaire) client.proprietaire = req.body.proprietaire;
    if(req.body.typedemande) client.type_demande = req.body.typedemande;
    if(req.body.dateacte) client.date_acte = req.body.dateacte;
    if(req.body.dateacc) client.date_accord = req.body.dateacc;
    if(req.body.titre) client.titre = req.body.titre;

    const filteredArray = data.clients.filter(cli => cli.nif !== req.body.nif);
    const unsortedArray = [...filteredArray, client];
    data.setClients(unsortedArray.sort((a, b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.clients);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'immatriculation', 'client.json'),
        JSON.stringify(data.clients)
    )
}

const deleteClient = async (req, res) => {
    const user = data.clients.find(cli => cli.nif === req.body.nif);
    if(!user){
        res.status(400).json({'message': 'client not found'});
    }
    const filteredArray = data.clients.filter(cli => cli.nif !== req.body.nif);
    data.setClients([...filteredArray]);
    res.json(data.clients);
    await fsPromises.writeFile(
        path.join(__dirname, '..', '..', 'model', 'immatriculation', 'client.json'),
        JSON.stringify(data.clients)
    )
}

const getClient = (req, res) => {
    const client = data.clients.find(cli => cli.nif === req.params.nif);
    let assujetissements = [];
    data.assujetissement.map(ass => {
        if(ass.id_contribuable === client.id)
            assujetissements.push(ass)
    });
    if(!client){
        return res.status(400).json({'message': 'client not found'});
    }

    client.assujetissements = assujetissements;
    res.json(client);
}

module.exports = {
    getAllclients,
    getClientByReferenceFiscal,
    addnewClient,
    updateClient,
    deleteClient,
    getClient
}