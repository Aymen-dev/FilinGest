import { Departement } from "./departement.model";
import { Equipe } from "./equipe.model";

export class EnteteProduction {
    id_entete: number;
    equipe: Equipe;
    departement: Departement;
    date_production: Date;

    constructor (id: number, equipe: Equipe, dep: Departement, dateProd: Date) {
        this.id_entete = id;
        this.equipe = equipe;
        this.departement = dep;
        this.date_production = dateProd;
    }
}