<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class detailsPlannification extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "details_plan";
    protected $primaryKey = 'id_details_plan';

    protected $fillable=[
        "Kg_standard" ,
        "titre" ,          
        "banc",
        "recette",
        "client",
        "observation"
    ];
}
