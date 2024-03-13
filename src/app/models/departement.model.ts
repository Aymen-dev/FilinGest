export class Departement {
    id_departement: number;
    nom_departement: string;

    constructor (id: number = 0, nom: string = '') {
        this.id_departement = id;
        this.nom_departement = nom;
    }
}