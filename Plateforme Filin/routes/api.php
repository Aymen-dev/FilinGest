<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



/*
/-------------------------------------------------
/ Equipe API Routes
/-------------------------------------------------
*/

Route::prefix('/equipes')->group(function () {
    Route::get('/dep/{id}', 'App\Http\Controllers\EquipeController@getListeEquipesByDep');
    Route::get('/', 'App\Http\Controllers\EquipeController@index');
    Route::get('{id}', 'App\Http\Controllers\EquipeController@getById');
    Route::post('add', 'App\Http\Controllers\EquipeController@store');
    Route::put('{id}', 'App\Http\Controllers\EquipeController@update');
    Route::delete('{id}', 'App\Http\Controllers\EquipeController@destroy');
});

Route::prefix('/personnel')->group(function () {
    Route::get('/', 'App\Http\Controllers\PersonnelController@index');
    Route::get('/equipe/{id}', 'App\Http\Controllers\PersonnelController@getListePersonnelByEquipe');
    Route::get('{name}', 'App\Http\Controllers\PersonnelController@getPersonnelByName');
});


Route::prefix('/machines')->group(function () {
    Route::get('get_by_dep/{id}', 'App\Http\Controllers\MachineController@getMachinesByDep');
});

Route::prefix('/departements')->group(function () {
    Route::get('/', 'App\Http\Controllers\DepartementController@index');
    Route::get('{id}', 'App\Http\Controllers\DepartementController@show');
});

Route::prefix('/production')->group(function () {
    Route::post('/create', 'App\Http\Controllers\ProductionController@createEnteteProduction');
    Route::post('/create_details', 'App\Http\Controllers\ProductionController@createDetailsProduction');
    Route::delete('{id}', 'App\Http\Controllers\ProductionController@destroy');
    Route::get('/', 'App\Http\Controllers\ProductionController@index');
    Route::get('{id}','App\Http\Controllers\ProductionController@getDetailsProductionByEnteteId');
    Route::put('{id}', 'App\Http\Controllers\ProductionController@updateDetailsProduction');
    Route::get('/titres_fil', 'App\Http\Controllers\ProductionController@getTitresFil');
    Route::get('/entetes_by_dep_for_curr_month/{id}', 'App\Http\Controllers\ProductionController@getEntetesForCurrentMonthByDep');
});

Route::prefix('/titres')->group(function () {
    Route::get('/', 'App\Http\Controllers\TitresFilController@index');
});

Route::prefix('/marques')->group(function () {
    Route::get('/', 'App\Http\Controllers\MarqueController@index');
});

Route::prefix('/plannification')->group(function() {
    Route::post('/create','App\Http\Controllers\planProductionController@createPlannification');
    Route::post('/findStates','App\Http\Controllers\planProductionController@getPlansForThisDAy');
});

