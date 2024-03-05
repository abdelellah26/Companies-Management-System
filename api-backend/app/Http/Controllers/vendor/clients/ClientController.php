<?php

namespace App\Http\Controllers\vendor\clients;

use App\Http\Controllers\Controller;
use App\Http\Requests\vendor\ClientRequest;
use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class ClientController extends Controller
{
    public function index(){
        $deliveryMans = DB::table('clients')
            ->join('users', 'clients.id_user', '=', 'users.id')
            ->whereNull('users.deleted_at')
            ->select(
                'users.id',
                'users.first_name',
                'users.last_name',
                'users.phone',
                'users.email',
                'users.gender'
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
            'email'=> $formFields['email'],
            'type'=>'client'
        ]);
       
        Client::create([
            'id_user' => $user->id,
            'id_neighborhood'=>$formFields['id_neighborhood']
        ]);
        return response()->json(['message' => 'Client created successfully.']);

    }

    public function show($id)
    {
        $client = DB::table('clients')
            ->join('users', 'clients.id_user', '=', 'users.id')
            ->join('neighborhoods','neighborhoods.id','=','clients.id_neighborhood')
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

        return response()->json($client);
    }


    public function update(ClientRequest $request, $id){
        $formFields = $request->validated();
        $user=User::findOrFail($id);
        $client=$user->client;
        $user->first_name=$formFields['first_name'];
        $user->last_name=$formFields['last_name'];
        $user->phone=$formFields['phone'];
        $user->gender=$formFields['gender'];
        $user->email=$formFields['email'];

        $client->id_neighborhood=$formFields['id_neighborhood'];

        $user->save();

        $client->save();
        return response()->json(['status' => true, 'message' => 'Client Updated Successfully']);

    }

    public function destroy($id){
        $user=User::findOrFail($id);
        if ($user->delete()) {
            return response()->json(['status' => true, 'message' => 'Client Deleted Successfully']);
        } else {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong'], 500);
        }

    }

}
