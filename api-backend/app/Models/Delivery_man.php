<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery_man extends Model
{
    use HasFactory;
    protected $table="delivery_mans";
    protected $primarykey='id';
    protected $fillable = [
        'id_user',
        'id_neighborhood',
    ];
}
