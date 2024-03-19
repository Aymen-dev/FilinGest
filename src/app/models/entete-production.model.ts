export class EnteteProduction {
    id_entete: number;
    equipe: number;
    departement: number;
    date_production: Date;

    constructor (id: number, equipe: number, dep: number, dateProd: Date) {
        this.id_entete = id;
        this.equipe = equipe;
        this.departement = dep;
        this.date_production = dateProd;
    }
}