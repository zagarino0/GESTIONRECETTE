const data = {
    gestions: require("../../model/gestion/gestion.json"),
    setGestions: function (data) { this.gestions = data },
    clients: require("../../model/immatriculation/client.json")
};

const getImpotNClient = (req,res) => {
    const annee = req.body.annee;
    const numero_impot = req.body.numero_impot;
    const raison_commercial = req.body.raison_commercial;
    const nom_commercial = req.body.nom_commercial;
    const addresse = req.body.addresse;
    const reference_fiscal = req.body.reference_fiscal;
    

}

const updateRegimeFiscal = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;
    const client = data.clients.find(cli => cli.nif === reference_fiscal);




}

const getAllResteARecouvrerByReferenceFiscal = (req, res) => {
    const reference_fiscal = req.body.reference_fiscal;

    if(reference_fiscal === "")
        res.json(data.clients);
    else{
        const client = data.clients.find(cli => cli.nif === reference_fiscal)
        res.json(client)
    }
}

const getResteARecouvrerByTwoDates = (req, res) => {
    const date_debut = req.body.date_debut;
    const date_fin = req.body.date_fin;
    const reference_fiscal = req.body.reference_fiscal;

}

const getResteARecouvrerByTwoDatesNnatureImpot = (req, res) => {
    const date_debut = req.body.date_debut;
    const date_fin = req.body.date_fin;

    const numero_impot = req.body.numero_impot;

    
}