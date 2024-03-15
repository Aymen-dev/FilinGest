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
             return response()->json(['message' => 'Liste des departements vide', 'data' => []], 200);
 
         return response()->json(['message' => 'Liste des departements retrouvée', 'data' => [
            'departements' => $deps
         ]], 200);
     }
}
