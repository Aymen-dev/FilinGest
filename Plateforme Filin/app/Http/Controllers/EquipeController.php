<?php

namespace App\Http\Controllers;


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
            return response()->json(['status_code' => 204, 'message' => 'Liste des equipes vide'], 200);

        return response()->json(['status_code' => 200, 'message' => 'Liste des equipes retrouvée', 'equipes' => $equipes], 200);
    }

    /** 
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function getById($id)
    {
        $equipe = Equipe::find($id);

        if (!$equipe)
            return response()->json(['status_code' => 404, 'message' => 'Equipe n\'existe pas'], 404);

        return response()->json(['status_code' => 200, 'message' => 'Equipe trouvée', 'equipe' => $equipe], 200);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Equipe::create($request->all());
        return response()->json(['status_code' => 200, 'message' => 'Equipe crée', 'equipes' => Equipe::all()], 200);
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
            return response()->json(['status_code' => 404, 'message' => 'Equipe n\'existe pas'], 404);

        $equipe->update($request->all());
        return response()->json(['status_code' => 200, 'message' => 'Equipe mise a jour', 'equipes' => Equipe::all()], 200);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $records_deleted = Equipe::destroy($id);
        if ($records_deleted == 0)
            return response()->json(['status_code'=> 404, 'message'=> 'Equipe n\'existe pas'], 404);

        return response()->json(['status_code'=> 200, 'message'=> 'Equipe supprimée', 'equipes' => Equipe::all()], 200);
    }
}
