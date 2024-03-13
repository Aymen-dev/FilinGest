export class Machine {
    numero: number;
    reference: string;
    nom_machine: string;
    etat_machine: string;
    caract_numerique: number;
    type: number;
    modele: number;
    marque: number;
    departement: number;
    systeme: number;

    constructor(num: number, ref: string, nom: string, etat: string, caract_numerique: number, systeme: number, type: number, modele: number, marque: number, dep: number) {
        this.numero = num;
        this.reference = ref;
        this.nom_machine = nom;
        this.etat_machine = etat;
        this.caract_numerique = caract_numerique;
        this.systeme = systeme;
        this.type = type;
        this.modele = modele;
        this.marque = marque;
        this.departement = dep;
    }
}