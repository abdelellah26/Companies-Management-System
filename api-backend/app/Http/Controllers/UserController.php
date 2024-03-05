<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class UserController extends Controller
{
    public function register(Request $request){
        $this->validate($request,[
            'first_name'=>'required',
            'last_name'=>'required',
            'phone'=>'required',
            'gender'=>'required',
            'email'=>'required',
            'password'=>'required',

        ]);
        $user=User::create([
            'first_name'=> $request->first_name,
            'last_name'=> $request->last_name,
            'phone'=> $request->phone,
            'gender'=> $request->gender,
            'email'=> $request->email ,
            'password'=> Hash::make($request->password),
            'type'=> 'admin'

        ]);
        $user->save();


    return response()->json([
        'message'=>'Account created successfully'
    ]);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $tokenName = 'auth_token';
        $roles = [];

        if ($user->type == 'admin') {
            $roles[] = 'role:admin';
        } elseif ($user->type == 'vendor') {
            $roles[] = 'role:vendor';
        }

        return response()->json([
            'token' => $user->createToken($tokenName, $roles)->plainTextToken,
            'isAdmin' => $user->type === 'admin',
        ]);


    }
}
