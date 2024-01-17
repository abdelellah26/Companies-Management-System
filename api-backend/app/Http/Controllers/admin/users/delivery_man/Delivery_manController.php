<?php

namespace App\Http\Controllers\admin\users\delivery_man;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Models\Delivery_man;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Delivery_manController extends Controller
{

    public function index(){
        // Utilisation de la jointure pour récupérer les données des utilisateurs avec les noms des quartiers
        $deliveryMans = DB::table('delivery_mans')
            ->join('users', 'delivery_mans.id_user', '=', 'users.id')
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

            $neighborhoodId = $formFields['id_neighborhood'];

            Delivery_man::create([
                'id_user' => $user->id,
                'id_neighborhood' => $neighborhoodId,
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
        $deliveryMans = DB::table('delivery_mans')
        ->join('users', 'delivery_mans.id_user', '=', 'users.id')
        ->join('neighborhoods', 'delivery_mans.id_neighborhood', '=', 'neighborhoods.id')
        ->select(
            'users.id',
            'users.first_name',
            'users.last_name',
            'users.phone',
            'users.gender',
            'users.email',
            'neighborhoods.name as neighborhood_name'
        )
        ->get();
        return response()->json(['status' => true, 'data' => $deliveryMans]);
    }


    public function update(UpdateUserRequest $request, $id){
        $formFields = $request->validated();
        $user=User::findOrFail($id);
        $user->update($formFields);
        return response()->json(['status' => true, 'message' => 'Delivery Man Updated Successfully']);

    }

    


}
