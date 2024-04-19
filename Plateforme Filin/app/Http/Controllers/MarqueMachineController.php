<?php

namespace App\Http\Controllers\Api\V2;

use App\Models\V2\MarqueMachine;
use App\Http\Controllers\Controller;
use App\Http\Requests\V2\StoreBulkMarqueMachineRequest;
use App\Http\Requests\V2\StoremarqueMachineRequest;
use App\Http\Requests\V2\UpdatemarqueMachineRequest;

class MarqueMachineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $marques=MarqueMachine::orderBy('nom_marque','asc')->get();
          if ($marques->isEmpty()) {
               return response()->json(['data'=>[],'message'=>'No data'], 404);
             }
          return response()->json(['data'=> $marques,'message'=>'Data retrieved successfully']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBulkMarqueMachineRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function bulkStore(StoreBulkMarqueMachineRequest $request){
        $marquesData=$request->all();
        $marquesMachinesModels=array_map(function($data) {
          return [
              'nom_marque'=>$data['nom_marque'],
              'code_marque'=>$data['code_marque']
          ];
        },$marquesData);
        MarqueMachine::insert($marquesMachinesModels);
        $marques=MarqueMachine::orderBy('nom_marque','asc')->get();
        return response()->json(['data'=>$marques,'message'=>'Bulk insert successful'],201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoremarqueMachineRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoremarqueMachineRequest $request)
    {
        return response()->json(MarqueMachine::create($request->all()));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\marqueMachine  $marqueMachine
     * @return \Illuminate\Http\Response
     */
    public function show($idMarque)
    {
        $marqueMachine = MarqueMachine::find($idMarque);
        return response()->json($marqueMachine);
    }

    
    public function edit(marqueMachine $marqueMachine)
    {
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatemarqueMachineRequest  $request
     * @param  \App\Models\marqueMachine  $marqueMachine
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatemarqueMachineRequest $request,$idMarque)
    {
        $marqueMachine=MarqueMachine::find($idMarque);
        $marques=MarqueMachine::orderBy('nom_marque','asc')->get();
        if ($marqueMachine) {
            $marqueMachine->update($request->all());
            $marques=MarqueMachine::orderBy('nom_marque','asc')->get();
            return response()->json(['data'=>$marques,'message'=>'Data updated successfully']);
        } else {
            return response()->json(['data'=>$marques,'message'=>'No matching id found'],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\marqueMachine  $marqueMachine
     * @return \Illuminate\Http\Response
     */
    public function destroy($marqueMachine)
    {
        $marqueMachine=MarqueMachine::find($marqueMachine);
        $marques=MarqueMachine::orderBy('nom_marque','asc')->get();
        if ($marqueMachine) {
            $machines = $marqueMachine->machines;
            if($machines->count()>0){
                return response()->json(['data' => [], 'message' => 'warning this Marque is referenced.']);
            }
            $marqueMachine->delete();
            $marques=MarqueMachine::orderBy('nom_marque','asc')->get();
            return response()->json(['data'=>$marques,'message'=>'Data deleted successfully']);
        } else {
            return response()->json(['data'=>$marques,'message'=>'No matching id found'],404);
        }
    }
}