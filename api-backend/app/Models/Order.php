<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Order extends Model
{
    use HasFactory,SoftDeletes;

    protected $table="orders";
    protected $primarykey='id';
    protected $fillable = [
        'id_client',
        'status',
        'total_paid'
    ];
}
