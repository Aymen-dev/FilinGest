<?php

namespace App\Models\V2;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class detailsPlannificationMachine extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = "details_plan_machine";
    protected $primaryKey = 'id_det_plan_mach';

    protected $fillable=[
        "machine",
        "details_plan"
    ];
}
