<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{

    /** 
     * @return \Illuminate\Http\Response
     */

     public function index()
     {
         $deps = Departement::all();
         if ($deps->isEmpty())
             return response()->json(['status_code' => 204, 'message' => 'Liste des departements vide'], 200);
 
         return response()->json(['status_code' => 200, 'message' => 'Liste des departements retrouvée', 'departements' => $deps], 200);
     }
}
