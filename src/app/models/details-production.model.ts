import { EnteteProduction } from "./entete-production.model";
import { Machine } from "./machine.model";
import { TitreFil } from "./titre-fil.model";

export class DetailsProduction {
    id: number;
    production: number;
    nb_levata: number;
    entete: number;
    machine: number;
    titre_fil: number | null;
    objectif_production: number;

    constructor(id: number, production: number, nb_levata: number, entete: number, machine: number, titre_fil: number, objectif_production: number) {
        this.id = id;
        this.production = production;
        this.nb_levata = nb_levata;
        this.entete = entete;
        this.machine = machine;
        this.titre_fil = titre_fil;
        this.objectif_production = objectif_production;
    }
}