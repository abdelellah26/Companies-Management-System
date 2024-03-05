<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class DetailOrder extends Model
{
    use HasFactory,SoftDeletes;
    protected $table="detail_orders";
    protected $primarykey='id';
    protected $fillable = [
        'id_product',
        'id_order',
        'quantity'
    ];
}
