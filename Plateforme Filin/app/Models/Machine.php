<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = "machines";

    //protected $fillable = [];

    protected $primaryKey = 'numero';

    public function departement(){
        return $this->belongsTo(Departement::class);
    }

}
