<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipe extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $primaryKey = 'id_equipe';
    protected $fillable = ['nom_equipe'];

    protected $table = "equipes";


    
}
