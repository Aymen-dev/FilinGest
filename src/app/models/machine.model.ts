import { Departement } from "./departement.model";
import { Marque } from "./marque.model";
import { Modele } from "./modele.model";

export class Machine {
    numero: number;
    reference: string;
    nom_machine: string;
    etat_machine: string;
    caract_numerique: number;
    modele: Modele;
    marque: Marque;
    departement: Departement;
    systeme: number;
    pds_vase: number;

    constructor(num: number, ref: string, nom: string, etat: string, caract_numerique: number, systeme: number, modele: Modele, marque: Marque, dep: Departement, pds_vase: number) {
        this.numero = num;
        this.reference = ref;
        this.nom_machine = nom;
        this.etat_machine = etat;
        this.caract_numerique = caract_numerique;
        this.systeme = systeme;
        this.modele = modele;
        this.marque = marque;
        this.departement = dep;
        this.pds_vase = pds_vase;
    }
}