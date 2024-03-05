<?php

namespace App\Http\Controllers\admin\users\vendors;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeliveryManRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\VendorRequest;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class VendorController extends Controller
{
    public function index(){
        // Utilisation de la jointure pour récupérer les données des utilisateurs avec les noms des quartiers
        $deliveryMans = DB::table('vendors')
            ->join('users', 'vendors.id_user', '=', 'users.id')
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
    public function store(VendorRequest $request)
    {

            $formFields = $request->validated();

            $user = User::create([
                'first_name' => $formFields['first_name'],
                'last_name' => $formFields['last_name'],
                'phone' => $formFields['phone'],
                'gender' => $formFields['gender'],
                'email' => $formFields['email'],
                'type'=>'vendor'
            ]);

            $neighborhoodId = $formFields['id_neighborhood'];

            Vendor::create([
                'id_user' => $user->id,
                'id_neighborhood' => $neighborhoodId,
            ]);

            return response()->json(['message' => 'Vendor created successfully.']);


    }

    public function show($id){
        $vendor= DB::table('vendors')
        ->join('users', 'vendors.id_user', '=', 'users.id')
        ->join('neighborhoods','neighborhoods.id','=','vendors.id_neighborhood')
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

    return response()->json($vendor);
    }


    public function update(DeliveryManRequest $request, $id){
        $formFields = $request->validated();
        $user=User::findOrFail($id);
        $vendor=$user->vendor;
        $user->first_name=$formFields['first_name'];
        $user->last_name=$formFields['last_name'];
        $user->phone=$formFields['phone'];
        $user->gender=$formFields['gender'];
        $user->email=$formFields['email'];

        $vendor->id_neighborhood=$formFields['id_neighborhood'];

        $user->save();
        $vendor->save();
        return response()->json(['status' => true, 'message' => 'Vendor Updated Successfully']);

    }

    public function destroy($id){
        $user=User::findOrFail($id);
        if ($user->delete()) {
            return response()->json(['status' => true, 'message' => 'Vendor Deleted Successfully']);
        } else {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong'], 500);
        }

    }
}
