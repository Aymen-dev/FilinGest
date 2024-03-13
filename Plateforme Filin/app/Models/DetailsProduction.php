<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailsProduction extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = "details_production";
    protected $primaryKey = 'id';
}
