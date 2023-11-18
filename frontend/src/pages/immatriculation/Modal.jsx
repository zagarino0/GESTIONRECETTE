import React from "react";
import Modal from "../../components/modals/Modal";
import { Button } from "../../components/button/button";
import Label from "../../components/title/label";

export const ModalError = (props) =>{

    return(
        <div>
        <Modal isOpen={props.isOpen} onClose={props.onClose} className="w-[500px]  h-[200px] flex justify-center items-center p-4">
    <div className="flex flex-col">
    <Label text="Des informations d'identification non valides ou votre compte n'a pas l'autorisation." className="ml-12"></Label>
    <div className="flex justify-center mt-4" >
    <Button children="OK" className="w-28" onClick={props.quitter}></Button>
    </div>
    </div>
        </Modal>
        </div>
    )
}

export const ModalErrorServer = (props) => {

    return(
        <div>
        <Modal isOpen={props.isOpen} onClose={props.onClose} className="w-[500px]  h-[190px] flex justify-center items-center p-4">
    <div className="flex flex-col">
    <Label text="La connexion a échoué. Veuillez réessayer."></Label>
    <div className="flex justify-center mt-4" >
    <Button children="OK" className="w-28" onClick={props.quitter}></Button>
    </div>
    </div>
        </Modal>
        </div>
    )
}

