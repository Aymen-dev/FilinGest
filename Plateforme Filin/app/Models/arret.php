<?php

namespace App\Models\V2;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class arret extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "arret";
    protected $primaryKey = 'id_arret';

    protected $fillable=[
        "date_debut_arret",
    ];
}
