import { Departement } from "../models/departement.model";
import { DetailsProduction } from "../models/details-production.model";
import { EnteteProduction } from "../models/entete-production.model";
import { Equipe } from "../models/equipe.model";
import { Machine } from "../models/machine.model";
import { Personnel } from "../models/personnel.model";
import { TitreFil } from "../models/titre-fil.model";

export interface BackendData {
    departement?: Departement,
    departements?: Departement[],
    enteteProduction?: EnteteProduction,
    entetesProduction?: EnteteProduction[],
    machines?: Machine[],
    equipe?: Equipe,
    equipes?: Equipe[],
    personnel?: Personnel,
    titresFil?: TitreFil[],
    detailsProduction?: DetailsProduction[],
}
