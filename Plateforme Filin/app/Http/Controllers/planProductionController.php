<?php

namespace App\Http\Controllers\Api\V2;

use Illuminate\Http\Request;
use App\Http\Requests\V2\StoreentetePlannificationRequest;
use App\Http\Controllers\Controller;

use App\Models\V2\arret;
use App\Models\V2\machine;
use App\Models\V2\entetePlannification;
use App\Models\V2\detailsPlannification;
use App\Models\V2\detailsPlannificationMachine;
use App\Models\V2\machine_arret;
use Carbon\Carbon;

class planProductionController extends Controller
{
    public function getMachinesStops($machines,$date){
      $etats=[];
      foreach($machines as $machine){
        $machiine = Machine::find($machine);
        $arretIds = machine_arret::where('machine', $machine)->pluck('arret');
        $arret = arret::whereIn('id_arret', $arretIds)->get();
        $filteredArrets = $arret->filter(function ($record) use ($date) {
            return Carbon::parse($record->date_debut_arret)->lte($date);
        });
        $sortedArrets = $filteredArrets->sortByDesc(function ($record) {
            return Carbon::parse($record->date_debut_arret);
         });
        $closestArret=$sortedArrets->first();
        if($closestArret===null){
          array_push($etats, ["machine" => $machiine, "etat" =>"en marche"]);        
        }else{
          $machArret=machine_arret::where('machine',$machine)
                                  ->where('arret',$closestArret->id_arret)
                                  ->first();
          if($machArret->date_fin_arret===null){
            array_push($etats, ["machine" => $machiine, "etat" =>"en arret"]);        
          }else if($machArret->date_fin_arret<=$date){
            array_push($etats, ["machine" => $machiine, "etat" =>"en marche"]);        
          }else if($machArret->date_fin_arret>$date){
            array_push($etats, ["machine" => $machiine, "etat" =>"en arret"]);        
          }                        
        }
      }
      return $etats;
    }
    public function getPlansForThisDAy(Request $request){
      $date = Carbon::parse($request->date)->toDateString();
      $etats=[];
      $plans=[];
      $machines2= machine::where('departement', $request->dep)->pluck('numero');
      $etats=$this->getMachinesStops($machines2,$date);
      foreach($machines2 as $machine){
        $entetes = entetePlannification::whereDate("date_debut_plan","<=",$date)
                                       ->whereDate("date_fin_plan", ">=",$date)
                                       ->pluck('id_entete_plan');
        $detailsPlanIds = detailsPlannificationMachine::where('machine', $machine)->pluck('details_plan');
        
        $detailsPlan = detailsPlannification::whereIn('id_details_plan', $detailsPlanIds)
        ->whereIn('entete_plan',$entetes)
        ->get();
        array_push($plans, ["machine" => $machine, "plan" =>$detailsPlan]);        
      }
      return response()->json(['message'=>'data retrieved successfully','data'=>["etats"=>$etats,"plans"=>$plans]]);
    }

    public function stopMachine($id,$date){
      $idArret;
      $arret=arret::where("date_debut_arret",$date)->first();
      if($arret){
        $idArret=$arret->id_arret;
      }else{
        $new_arret = new arret();
        $new_arret->date_debut_arret =$date;
        $new_arret->save();
        $idArret=$new_arret->id_arret;
      }
      $machArret=$arret=machine_arret::where("machine",$id)
                                     ->where("arret",$idArret)
                                     ->first();
      if(!$machArret){
        $new_machine_arret=new machine_arret();
        $new_machine_arret->date_fin_arret=null;
        $new_machine_arret->machine=$id;
        $new_machine_arret->arret=$idArret;
        $new_machine_arret->save();
      }
    }

    public function createPlannification(Request $request){
        $entete=$request->entete;
        $etatsMach=$request->etatsMachines;
        $inserts=$request->insertions;
        $createdEntete = entetePlannification::create($entete);
        foreach ($etatsMach as $etat){
            if($etat["state"]!=="en marche"){
              $this->stopMachine($etat["id"],$entete['date_debut_plan']);
            }
        }
        foreach ($inserts as $insertion){
            if($insertion["observation"]!=="en arrét"){
                $new_details_plan=new detailsPlannification();
                $new_details_plan->Kg_standard=$insertion['Kg'];
                $new_details_plan->titre=$insertion['titre'];
                $new_details_plan->recette=$insertion['recette'];
                $new_details_plan->client=$insertion['client'];
                $new_details_plan->observation=$insertion['observation'];
                $new_details_plan->entete_plan= $createdEntete->id_entete_plan;
                if($insertion["Banc"]===0){
                    $new_details_plan->banc=null;
                }else{
                    $new_details_plan->banc=$insertion['Banc'];
                }
                $new_details_plan->save();
                $idDetailsPlan=$new_details_plan->id_details_plan;
                $idList = explode("+", $insertion["machinesFil"]);
              foreach ($idList as $id){
                $newId = intval($id);
                $new_details_plan_mach=new detailsPlannificationMachine();
                $new_details_plan_mach->machine=$newId;
                $new_details_plan_mach->details_plan=$idDetailsPlan;
                $new_details_plan_mach->save(); 
               }
              if($insertion["date_arret_prevu"]!==null){
                foreach ($idList as $id){
                   $this->stopMachine($id,$insertion["date_arret_prevu"]);
                 }
              }
            }
        }
        return response()->json(['message' => 'found it', 'data' =>$entete]);
    }
}
