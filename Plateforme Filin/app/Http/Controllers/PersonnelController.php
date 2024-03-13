<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personnel;

class PersonnelController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $personnel = Personnel::all();
        if ($personnel->isEmpty())
            return response()->json(['status_code' => 204, 'message' => 'Liste des personnel vide'], 200);

        return response()->json(['status_code' => 200, 'message' => 'Liste des personnel retrouvée', 'personnel' => $personnel], 200);
    }

    /**
     * @param string $name
     * @return \Illuminate\Http\Response
     */

    public function getPersonnelByName($name)
    {
        return response()->json(Personnel::where('nom_prenom', 'like', '%' . $name . '%')->get());
    }
}
