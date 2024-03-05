<?php

namespace App\Http\Controllers\SuperAdmin\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Requests\UserRequest;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index(){
        // Utilisation de la jointure pour récupérer les données des utilisateurs avec les noms des quartiers
        $deliveryMans = DB::table('admins')
            ->join('users', 'admins.id_user', '=', 'users.id')
            ->select(
                'users.id',
                'users.first_name',
                'users.last_name',
                'users.phone',
                'users.gender',
                'users.email'
            )
            ->get();

    return response()->json(['status' => true, 'data' => $deliveryMans]);
    }
    public function store(UserRequest $request)
    {

            $formFields = $request->validated();

            $user = User::create([
                'first_name' => $formFields['first_name'],
                'last_name' => $formFields['last_name'],
                'phone' => $formFields['phone'],
                'gender' => $formFields['gender'],
                'email' => $formFields['email'],
                'password' => Hash::make($formFields['password']),
                'type'=>'admin'
            ]);


            Admin::create([
                'id_user' => $user->id
            ]);


            return response()->json(['message' => 'Admin created successfully.']);


    }

    public function show($id){
        $deliveryMans = DB::table('admins')
        ->join('users', 'admins.id_user', '=', 'users.id')
        ->select(
            'users.id',
            'users.first_name',
            'users.last_name',
            'users.phone',
            'users.gender',
            'users.email'
        )
        ->get();
        return response()->json(['status' => true, 'data' => $deliveryMans]);
    }


    public function update(UpdateAdminRequest $request, $id){
        $formFields = $request->validated();
        $user=User::findOrFail($id);
        $user->update($formFields);
        return response()->json(['status' => true, 'message' => 'Delivery Man Updated Successfully']);
    }



}
