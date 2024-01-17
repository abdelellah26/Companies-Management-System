<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Neighborhood extends Model
{
    use HasFactory,SoftDeletes;
    protected $table="neighborhoods";
    protected $primarykey='id';
    protected $fillable = [
        'name',
    ];
}
