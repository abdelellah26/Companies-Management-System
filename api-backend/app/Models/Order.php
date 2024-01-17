<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table="orders";
    protected $primarykey='id';
    protected $fillable = [
        'id_client',
        'total',
        'total_paid'
    ];

    public function client(){
        return $this->belongsTo(Client::class, 'id_client');
    }
}
