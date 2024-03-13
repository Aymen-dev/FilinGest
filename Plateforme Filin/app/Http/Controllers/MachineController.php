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
            return response()->json(['status_code' => 204, 'machines' => []]);
        
        return response()->json(['status_code' => 200, 'machines' => $machines], 200);
    }
}
