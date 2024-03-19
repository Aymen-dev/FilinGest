<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use App\Models\Equipe;
use \Illuminate\Http\Request;

class EquipeController extends Controller
{
    /** 
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $equipes = Equipe::all();
        if ($equipes->isEmpty())
            return response()->json(['message' => 'Liste des equipes vide', 'data' => []], 200);

        return response()->json(['message' => 'Liste des equipes retrouvée', 'data' => [
            'equipes' => $equipes
        ]], 200);
    }

    /** 
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function getById($id)
    {
        $equipe = Equipe::find($id);
        if (!$equipe)
            return response()->json(['message' => 'Equipe n\'existe pas', 'data' => null], 404);

        return response()->json(['message' => 'Equipe retrouvée', 'data' => [
            'equipe' => $equipe
        ]], 200);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Equipe::create($request->all());
        return response()->json(['message' => 'Equipe crée', 'data' => [
            'equipes' => Equipe::all()
        ]], 200);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $equipe = Equipe::find($id);
        if (!$equipe)
            return response()->json(['message' => 'Equipe n\'existe pas', 'data' => [
                'equipes' => Equipe::all()
            ]], 404);

        $equipe->update($request->all());
        return response()->json(['message' => 'Equipe mise a jour', 'data' => [
            'equipes' => Equipe::all()
        ]], 200);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $records_deleted = Equipe::destroy($id);
        if ($records_deleted == 0)
            return response()->json(['message' => 'Equipe n\'existe pas', 'data' => [
                'equipes' => Equipe::all()
            ]], 404);

        return response()->json(['message' => 'Equipe supprimée', 'data' => [
            'equipes' => Equipe::all()
        ]], 200);
    }

    public function getListeEquipesByDep($id)
    {
        $departement = Departement::find( $id );
        $equipes = Equipe::where('departement', $id)->get();
        if ($equipes->isEmpty())
            return response()->json()(['message' => 'Liste vide', 'data' => []], 200);
        return response()->json(['message'=> 'Liste retrouvée', 'data' => [
            'equipes' => $equipes
        ]], 200);
    }
}
