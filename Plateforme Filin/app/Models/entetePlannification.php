<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class entetePlannification extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "entete_plan";
    protected $primaryKey = 'id_entete_plan';

    protected $fillable=[
        "matiere",         
        "date_debut_plan", 
        "date_fin_plan",   
        "etat_systeme",
        "systeme"
    ];
}
