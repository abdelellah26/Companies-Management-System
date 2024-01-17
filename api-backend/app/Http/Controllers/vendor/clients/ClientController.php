<?php

namespace App\Http\Controllers\vendor\clients;

use App\Http\Controllers\Controller;
use App\Http\Requests\vendor\ClientRequest;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function index(){
        $deliveryMans = DB::table('clients')
            ->join('users', 'clients.id_user', '=', 'users.id')
            ->select(
                'users.id',
                'users.first_name',
                'users.last_name',
                'users.phone',
            )
            ->get();

    return response()->json(['status' => true, 'data' => $deliveryMans]);
    }

    public function store(ClientRequest $request) {
        $formFields = $request->validated();

        $user = User::create([
            'first_name' => $formFields['first_name'],
            'last_name' => $formFields['last_name'],
            'phone' => $formFields['phone'],
            'gender' => $formFields['gender'],
        ]);
        Client::create([
            'id_user' => $user->id,
        ]);
        return response()->json(['message' => 'Client created successfully.']);

    }

    public function show($id){
        $client = DB::table('clients')
        ->join('users', 'clients.id_user', '=', 'users.id')
        ->select(
            'users.id',
            'users.first_name',
            'users.last_name',
            'users.phone',
            'users.gender',
        )
        ->get();
        return response()->json(['status' => true, 'data' => $client]);
    }


    public function update(ClientRequest $request, $id){
        $formFields = $request->validated();
        $user=User::findOrFail($id);
        $user->update($formFields);
        return response()->json(['status' => true, 'message' => 'Client Updated Successfully']);

    }
}
