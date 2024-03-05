<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'gender',
        'email',
        'password',
        'type'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function isAdmin(){
        // Utilisez la relation avec le modèle Admin pour vérifier si l'utilisateur est un administrateur
        return $this->admin()->exists();
    }
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    public function isVendor()
    {
        // Utilisez la relation avec le modèle Vendor pour vérifier si l'utilisateur est un fournisseur
        return $this->vendor()->exists();
    }



    public function vendor()
    {
        return $this->hasOne(Vendor::class, 'id_user');
    }

    public function client(){
        return $this->hasOne(Client::class, 'id_user');
   }
   public function deliveryMan(){
    return $this->hasOne(Delivery_man::class, 'id_user');
}
}
