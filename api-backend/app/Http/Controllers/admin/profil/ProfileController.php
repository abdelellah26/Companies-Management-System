<?php

namespace App\Http\Controllers\admin\profil;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function index() {
        $admin = Auth::user();

        if ($admin && $admin->type === 'admin') {
            $adminInfo = [
                'id' => $admin->id,
                'first_name' => $admin->first_name,
                'last_name' => $admin->last_name,
                'phone' => $admin->phone,
                'gender' => $admin->gender,
                'email' => $admin->email,
            ];

            return response()->json([$adminInfo]);
        } else {
            return response()->json(['status' => false, 'message' => 'Utilisateur non autorisé.'], 403);
        }
    }
}
