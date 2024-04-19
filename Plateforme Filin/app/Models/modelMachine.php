<?php

namespace App\Models\V2;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class modelMachine extends Model
{
    public $timestamps = false;
    protected $table='modeles_machine';
    protected $primaryKey='id_modele';
    public $incrementing=true;
    protected $keyType='integer';

    protected $fillable=[
        'nom_modele',
        'code_modele'
    ];
    use HasFactory;
    public function machines() {
        return $this->hasMany(Machine::class,'modele', 'id_modele');
    }
}
