<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;

class MachineController extends Controller
{

    /**
     * @param int $id;
     * @return Illuminate\Http\Response;
     */


    function getMachinesByDep($id)
    {
        $machines = Machine::where('departement', $id)->get();
        if ($machines->isEmpty())
            return response()->json(['message' => 'Liste des machines vide', 'data' => []], 200);
        
        return response()->json(['message' => 'Liste des machines retrouvée', 'data' => [
            'machines' => $machines
        ]], 200);
    }
}
