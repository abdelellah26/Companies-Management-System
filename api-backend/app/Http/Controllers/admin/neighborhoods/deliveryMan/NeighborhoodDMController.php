<?php

namespace App\Http\Controllers\admin\neighborhoods\deliveryMan;

use App\Http\Controllers\Controller;
use App\Models\Neighborhood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NeighborhoodDMController extends Controller
{
    public function index(){

        $neighb = DB::table('neighborhoods')
        ->leftJoin('delivery_mans', 'neighborhoods.id', '=', 'delivery_mans.id_neighborhood')
        ->whereNull('delivery_mans.id')
        ->select('neighborhoods.*')
        ->get();

        return response()->json(['status' => true, 'data' => $neighb]);
    }
}
