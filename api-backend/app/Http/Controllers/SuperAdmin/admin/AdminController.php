<?php

namespace App\Http\Controllers\SuperAdmin\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\UpdateAdminRequest;
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
    public function store(AdminRequest $request)
    {
        try {
            DB::beginTransaction();

            // Check if the email already exists
            if (User::where('email', $request->input('email'))->exists()) {
                return response()->json(['status' => false, 'message' => 'Email already exists.'], 422);
            }

            // Continue with the creation if the email is unique
            $formFields = $request->validated();

            $user = User::create([
                'first_name' => $formFields['first_name'],
                'last_name' => $formFields['last_name'],
                'phone' => $formFields['phone'],
                'gender' => $formFields['gender'],
                'email' => $formFields['email'],
                'password' => Hash::make($formFields['password']),
            ]);

            $user->sendEmailVerificationNotification();

            Admin::create([
                'id_user' => $user->id
            ]);

            DB::commit();

            event(new Registered($user));

            return response()->json(['status' => true, 'message' => 'User and delivery man created successfully. Verification email sent.']);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json(['status' => false, 'message' => 'Failed to create user and delivery man', 'error' => $e->getMessage()], 500);
        }
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
