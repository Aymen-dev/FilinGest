<?php

namespace App\Http\Controllers\Api\V2;

use App\Models\V2\modelMachine;
use App\Http\Controllers\Controller;
use App\Http\Requests\V2\StoreBulkModelMachineRequest;
use App\Http\Requests\V2\StoremodelMachineRequest;
use App\Http\Requests\V2\UpdatemodelMachineRequest;

class ModelMachineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $models=modelMachine::orderBy('nom_modele','asc')->get();
          if ($models->isEmpty()) {
               return response()->json(['data'=>[],'message'=>'No data'], 404);
             }
          return response()->json(['data'=> $models,'message'=>'Data retrieved successfully']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function bulkStore(StoreBulkModelMachineRequest $request){
        $modelsData=$request->all();
        $modelsMachinesModels=array_map(function($data) {
          return [
              'nom_modele'=>$data['nom_modele'],
              'code_modele'=>$data['code_modele']
          ];
        },$modelsData);
        modelMachine::insert($modelsMachinesModels);
        $models=modelMachine::orderBy('nom_modele','asc')->get();
        return response()->json(['data'=>$models,'message'=>'Bulk insert successful'],201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoremodelMachineRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoremodelMachineRequest $request)
    {
        return modelMachine::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\modelMachine  $modelMachine
     * @return \Illuminate\Http\Response
     */
    public function show(modelMachine $modelMachine)
    {
        return $modelMachine;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\modelMachine  $modelMachine
     * @return \Illuminate\Http\Response
     */
    public function edit(modelMachine $modelMachine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatemodelMachineRequest  $request
     * @param  \App\Models\modelMachine  $modelMachine
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatemodelMachineRequest $request, $idModel)
    {
        $model=modelMachine::find($idModel);
        $models=modelMachine::orderBy('nom_modele','asc')->get();
    
        if ($model) {
            $model->update($request->all());
            $models=modelMachine::orderBy('nom_modele','asc')->get();
            return response()->json(['data'=>$models,'message'=>'Data updated successfully']);
        } else {
            return response()->json(['data'=>$models,'message'=>'No matching id found'],404);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\modelMachine  $modelMachine
     * @return \Illuminate\Http\Response
     */
    public function destroy($idmodelMachine)
    {
        $model=modelMachine::find($idmodelMachine);
        $models=modelMachine::orderBy('nom_modele','asc')->get();
        if ($model) {
            $machines = $model->machines;
            if($machines->count()>0){
                return response()->json(['data' => [], 'message' => 'warning this Model is referenced.']);
            }
            $model->delete();
            $models=modelMachine::orderBy('nom_modele','asc')->get();
            return response()->json(['data'=>$models,'message'=>'Data deleted successfully']);
        } else {
            return response()->json(['data'=>$models,'message'=>'No matching id found'],404);
        }
    }
}
