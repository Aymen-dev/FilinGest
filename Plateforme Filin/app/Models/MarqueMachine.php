<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarqueMachine extends Model
{
    public $timestamps = false;
    protected $table='marques_machine';
    protected $primaryKey='id_marque';
    public $incrementing=true;
    protected $keyType='integer';

    protected $fillable=[
        'nom_marque',
    ];

    use HasFactory;
    public function machines() {
        return $this->hasMany(Machine::class,'marque','id_marque');
    }
}