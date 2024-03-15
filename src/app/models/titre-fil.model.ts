export class TitreFil {
    id_titre: number;
    valeur_titre: number;
    nb_levata: number;

    constructor(id: number, valeur: number, nb_levata: number) {
        this.id_titre = id;
        this.valeur_titre = valeur;
        this.nb_levata = nb_levata;
    }
}