<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'id_category',
        'name',
        'pic',
        'sku',
        'minimum_quantity',
        'quantity',
        'purchase_price',
        'selling_price',
    ];
    public function category(){
        return $this->belongsTo(Category::class, 'id_category');
    }
}
