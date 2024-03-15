export class Equipe {
    id_equipe: number;
    nom_equipe: string;

    constructor(id: number = 0, nom: string = '') {
        this.id_equipe = id;
        this.nom_equipe = nom;
    }
}