<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;
    protected $table="vendors";
    protected $primarykey='id';
    protected $fillable = [
        'id_user',
        'id_neighborhood',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'id_user');
    }
    public function neighborhood(){
        return $this->belongsTo(Neighborhood::class, 'id_neighborhood');
    }

    public function isVendor(){
        return true;
    }
}
