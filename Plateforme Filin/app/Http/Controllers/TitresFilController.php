<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TitreFil;

class TitresFilController extends Controller
{
    function index()
    {
        $titres = TitreFil::all();
        if($titres->isEmpty())
            return response()->json(["message" => "Liste des titres vide", "data" => []], 202);

        return response()->json(["message" => "Liste des titres retrouvée", "data" => [
            'titresFil' => $titres
        ]], 200);
        
    }
}
