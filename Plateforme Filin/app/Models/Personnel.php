<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "personnel";
    protected $primaryKey = 'id_personnel';
    protected $fillable = ['nom_prenom', 'role', 'equipe'];

}
