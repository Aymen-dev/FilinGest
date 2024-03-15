export class Personnel {

    id_personnel: number;
    nom_prenom: string;
    role: string;
    equipe: number;

    constructor(id: number, nom_prenom: string, role: string, equipe: number){
        this.id_personnel = id;
        this.nom_prenom = nom_prenom;
        this.role = role;
        this.equipe = equipe;
    }
}