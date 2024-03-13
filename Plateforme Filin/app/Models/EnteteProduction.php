<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnteteProduction extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = "entetes_production";
    protected $primaryKey = 'id_entete';
}
