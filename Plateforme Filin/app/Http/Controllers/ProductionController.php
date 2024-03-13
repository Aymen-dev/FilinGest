<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use App\Models\TitreFil;
use App\Models\DetailsProduction;
use App\Models\EnteteProduction;
use App\Models\Equipe;
use App\Models\Machine;
use Illuminate\Http\Request;

class ProductionController extends Controller
{
    /** 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function createEnteteProduction(Request $request)
    {
        $entete = new EnteteProduction();
        $entete->equipe = $request->equipe;
        $entete->date_production = $request->date;
        $entete->departement = $request->dep;

        $entete->save();
        $dep = Departement::find($request->dep);
        return response()->json(['status_code' => 200, 'message' => 'Entete crée', 'entete' => $entete, 'departement' => $dep], 201);
    }

    public function createDetailsProduction(Request $request)
    {
        //recevoir le tableau de details
        $details = $request->productionDetails;

        //parcourir chaque detail dans le tableau
        foreach ($details as $detail) {
            //le calcul du kg_produit differe d'un dep a un autre donc on verifie on est dans quel dep
            //systeme 0 -> dep filature, systeme != 0 -> dep preparation
            $systeme = $detail['systeme'];
            if ($systeme == 0) {
                $machine = Machine::where('numero', $detail['numero_machine'])->first();
                //le champ 'caract_numerique' indique le pds levata dans les prods filature
                $pds_levata = $machine->caract_numerique;
                $kg_produit = $detail['nbLevata'] * $pds_levata;
                $titre = TitreFil::find($detail['titre']);
                $objectif_prod = $titre->nb_levata * $pds_levata;
            } else {
                //on retrouve le nb de vases de la reunisseuse du systeme retrouvé
                $reunisseuse = Machine::where('systeme', $systeme)
                    ->where('nom_machine', 'Reunisseuse')->first();
                //le champ 'caract_numerique' indique le nb de vases dans les prods preparation 
                $nbr_vases = $reunisseuse->caract_numerique;
                $pds_vase = $reunisseuse->pds_vase;
                $kg_produit = $detail['nbLevata'] * ($nbr_vases * $pds_vase);
                                                        //Poids Levata
                $objectif_prod = 0;
            }


            $new_record = new DetailsProduction();

            $new_record->production = $kg_produit;
            $new_record->nb_levata = $detail['nbLevata'];
            $new_record->entete = $detail['id_entete'];
            $new_record->numero_machine = $detail['numero_machine'];
            $new_record->titre_fil = $detail['titre'];
            $new_record->objectif_production = $objectif_prod;

            $new_record->save();
        }
        return response()->json(['message' => 'Details Enregistés!', 'data' => DetailsProduction::all()], 201);
    }

    public function updateDetailsProduction(Request $request, $id)
    {
        $details = $request->productionDetails;
        $idEntete = $details[0]['id_entete'];
        $records = DetailsProduction::where('entete', $idEntete)->get();
        $i = 0;
        foreach ($records as $record) {
            // You can update the 'nb_levata' field based on your requirements
            // For example, if you want to update it with a value from the request:
            $record->nb_levata = $details[$i]['nbLevata']; // Assuming 'nbLevata' is the field you want to update it with

            // Save the changes to the record
            $record->save();
            $i++;
        }

        return response()->json(['message' => 'Details mises à jour', 'data' => $records], 200);
    }

    public function destroy($id)
    {
        EnteteProduction::findOrFail($id)->delete();
        return response()->json(['message' => 'Production supprimée', 'data' => EnteteProduction::all()], 200);
    }

    

    public function index()
    {
        $prods = EnteteProduction::all();
        if ($prods->isEmpty())
            return response()->json(['message' => 'Liste des productions vide', 'data' => []], 202);

        $data = [];
        foreach ($prods as $production) {
            $details = [
                'id_entete' => $production->id_entete,
                'equipe' => Equipe::find($production->equipe),
                'departement' => Departement::find($production->departement),
                'date_production' => $production->date_production,
            ];
            array_push($data, $details);
        }

        return response()->json(['message' => 'Liste des productions retrouvée', 'data' => $data], 200);
    }

    public function getDetailsProductionByEnteteId($id)
    {
        $records = DetailsProduction::where('entete', $id)->get();
        $machines = [];
        foreach ($records as $record) {
            $machine = Machine::find($record->numero_machine);
            array_push($machines, $machine);
        }
        $entete = EnteteProduction::find($id);
        $dep = Departement::find($entete->departement);

        return response()->json(['message' => 'Details retrouvées', 'machines' => $machines, 'entete' => $entete, 'departement' => $dep, 'data' => $records], 200);
    }
}
