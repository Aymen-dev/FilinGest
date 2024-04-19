<?php

namespace App\Models\V2;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class machine_arret extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "machine_arret";
    protected $primaryKey = 'id_mach_arret';

    protected $fillable=[
        "machine", 
        "arret",
        "date_fin_arret"
    ];
}
