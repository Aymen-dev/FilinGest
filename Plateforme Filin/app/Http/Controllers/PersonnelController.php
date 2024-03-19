<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Personnel;
use App\Models\Equipe;

class PersonnelController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $personnel = Personnel::all();
        if ($personnel->isEmpty())
            return response()->json(['message' => 'Liste des personnel vide', 'data' => []], 200);

        return response()->json(['message' => 'Liste des personnel retrouvée', 'data' => [
            'personnel' => $personnel
        ]], 200);
    }

    /**
     * @param string $name
     * @return \Illuminate\Http\Response
     */

    public function getPersonnelByName($name)
    {
        return response()->json(Personnel::where('nom_prenom', 'like', '%' . $name . '%')->get());
    }

    public function getListePersonnelByEquipe($id)
    {
        $equipe = Equipe::find($id);
        $listePersonnel = Personnel::where('equipe', $id)->get();
        if ($listePersonnel->isEmpty())
            return response()->json(['message' => 'Liste des personnel vide', 'data' => []], 200);

        return response()->json(['message' => 'Liste retrouvée', 'data' => [
            'personnel' => $listePersonnel
        ]], 200);
    }
}
