<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use App\Models\TitreFil;
use App\Models\DetailsProduction;
use App\Models\EnteteProduction;
use App\Models\Equipe;
use App\Models\Machine;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ProductionController extends Controller
{

    /*--------------------------------------------*/
    /*--------------------------------------------*/
    /*-----------     ENTETES     ----------------*/
    /*--------------------------------------------*/
    /*--------------------------------------------*/

    /** 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function createEnteteProduction(Request $request)
    {
        $entete = new EnteteProduction();
        $entete->equipe = $request->idEquipe;
        $entete->date_production = $request->date_production;
        $entete->departement = $request->idDepartement;

        $entete->save();
        $dep = Departement::find($request->departement);
        $data = [
            'enteteProduction' => $entete,
            'departement' => $dep
        ];
        return response()->json(['message' => 'Entete crée', 'data' => $data], 201);
    }


    public function getEntetesForCurrentMonthByDep($depId)
    {
        $entetes = EnteteProduction::where('departement', $depId)
            ->whereBetween('date_production', [Carbon::now()->startOfMonth(), Carbon::today()])
            ->get();

        if ($entetes->isEmpty())
            return response()->json(['message' => 'Liste des entetes vide', 'data' => []], 200);

        return response()->json(['message' => 'Liste des entetes retrouvée', 'data' => [
            'entetesProduction' => $entetes
        ]], 201);
    }

    /** 
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        EnteteProduction::findOrFail($id)->delete();
        return response()->json(['message' => 'Production supprimée', 'data' => EnteteProduction::all()], 200);
    }

    /** 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prods = EnteteProduction::all();
        if ($prods->isEmpty())
            return response()->json(['message' => 'Liste des productions vide', 'data' => []], 202);

        $equipes = [];
        $departements = [];
        foreach ($prods as $production) {
            array_push($equipes, Equipe::find($production->equipe));
            array_push($departements, Departement::find($production->departement));
        }

        return response()->json(['message' => 'Liste des productions retrouvée', 'data' => [
            'entetesProduction' => $prods,
            'equipes' => $equipes,
            'departements' => $departements
        ]], 200);
    }

    /*--------------------------------------------*/
    /*--------------------------------------------*/
    /*-----------     DETAILS     ----------------*/
    /*--------------------------------------------*/
    /*--------------------------------------------*/

    /** 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function createDetailsProduction(Request $request)
    {
        $details = $request->productionDetails;

        foreach ($details as $detail) {
            //le calcul du kg_produit differe d'un dep a un autre donc on verifie on est dans quel dep
            //systeme 0 -> dep filature, systeme != 0 -> dep preparation

            $machine = Machine::where('numero', $detail['numero_machine'])->first();
            $nbLevata = $detail['nbLevata'];
            $production = $this->calculateMachineProduction($machine, $nbLevata);
            if ($machine->nom_machine != 'Reunisseuse') {
                $titre = TitreFil::find($detail['titre']);
                if ($titre)
                    $objectif_prod = $titre->nb_levata * $machine->caract_numerique;
                else
                    $objectif_prod = 0;
            } else
                $objectif_prod = 0;

            $new_record = new DetailsProduction();
            $new_record->production = $production;
            $new_record->nb_levata = $detail['nbLevata'];
            $new_record->entete = $detail['id_entete'];
            $new_record->machine = $detail['numero_machine'];
            $new_record->titre_fil = $detail['titre'];
            $new_record->objectif_production = $objectif_prod;

            $new_record->save();
        }
        return response()->json(['message' => 'Details Enregistés!', 'data' => [
            'detailsProduction' => DetailsProduction::all()
        ]], 201);
    }

    /** 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

    public function updateDetailsProduction(Request $request)
    {
        $details = $request->productionDetails;
        $idEntete = $details[0]['id_entete'];
        $records = DetailsProduction::where('entete', $idEntete)->get();

        $i = 0;
        foreach ($records as $record) {
            $machine = Machine::where('numero', $record['machine'])->first();
            $nbLevata = $details[$i]['nbLevata'];
            $record->nb_levata = $nbLevata;
            $record->production = $this->calculateMachineProduction($machine, $nbLevata);
            // Save the changes to the record
            $record->save();
            $i++;
        }

        return response()->json(['message' => 'Details mises à jour', 'data' => $records], 200);
    }

    /** 
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function getDetailsProductionByEnteteId($id)
    {
        $records = DetailsProduction::where('entete', $id)->get();
        $machines = [];
        foreach ($records as $record) {
            $machine = Machine::find($record->machine);
            array_push($machines, $machine);
        }
        $entete = EnteteProduction::find($id);

        $data = [
            'machines' => $machines,
            'enteteProduction' => $entete,
            'detailsProduction' => $records,
            'equipe' => Equipe::find($entete->equipe),
            'departement' => Departement::find($entete->departement)
        ];
        return response()->json(['message' => 'Details retrouvées', 'data' => $data], 200);
    }

    /**
     * @return float
     */
    private function calculateMachineProduction($machine, $nbLevata)
    {
        $systeme = $machine->systeme;
        if ($systeme == 0)
            $production = $nbLevata * $machine->caract_numerique;
        else {
            $reunisseuse = Machine::where('systeme', $systeme)
                ->where('nom_machine', 'Reunisseuse')->first();
            //le champ 'caract_numerique' indique le nb de vases dans les prods preparation 
            $nbr_vases = $reunisseuse->caract_numerique;
            $pds_vase = $reunisseuse->pds_vase;
            $production = $nbLevata * ($nbr_vases * $pds_vase);
        }
        return $production;
    }
}
