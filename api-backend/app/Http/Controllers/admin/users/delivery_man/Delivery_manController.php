<?php

namespace App\Http\Controllers\admin\users\delivery_man;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeliveryManRequest;
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
            ->whereNull('users.deleted_at')
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

    public function store(DeliveryManRequest $request) {
        $formFields = $request->validated();

        $user = User::create([
            'first_name' => $formFields['first_name'],
            'last_name' => $formFields['last_name'],
            'phone' => $formFields['phone'],
            'gender' => $formFields['gender'],
            'email'=> $formFields['email'],
            'type'=>'delivery_man'
        ]);
        Delivery_man::create([
            'id_user' => $user->id,
            'id_neighborhood'=>$formFields['id_neighborhood']
        ]);
        return response()->json(['message' => 'Delivery man created successfully.']);

    }
    public function show($id){
        $deliveryMans= DB::table('delivery_mans')
        ->join('users', 'delivery_mans.id_user', '=', 'users.id')
        ->join('neighborhoods','neighborhoods.id','=','delivery_mans.id_neighborhood')
        ->where('users.id', '=', $id)
        ->select(
            'users.id',
            'users.first_name',
            'users.last_name',
            'users.phone',
            'users.gender',
            'users.email',
            'neighborhoods.name'
        )
        ->get();

    return response()->json($deliveryMans);
    }





    public function update(DeliveryManRequest $request, $id){
        $formFields = $request->validated();
        $user=User::findOrFail($id);
        $deliveryMan=$user->deliveryMan;
        $user->first_name=$formFields['first_name'];
        $user->last_name=$formFields['last_name'];
        $user->phone=$formFields['phone'];
        $user->gender=$formFields['gender'];
        $user->email=$formFields['email'];

        $deliveryMan->id_neighborhood=$formFields['id_neighborhood'];

        $user->save();
        $deliveryMan->save();
        return response()->json(['status' => true, 'message' => 'Delivery man  Updated Successfully']);

    }

    public function destroy($id){
        $user=User::findOrFail($id);
        if ($user->delete()) {
            return response()->json(['status' => true, 'message' => 'Delivery Man Deleted Successfully']);
        } else {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong'], 500);
        }

    }



}
