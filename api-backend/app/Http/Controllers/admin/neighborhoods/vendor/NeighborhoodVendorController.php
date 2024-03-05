<?php

namespace App\Http\Controllers\admin\neighborhoods\vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NeighborhoodVendorController extends Controller
{
    public function index(){

        $neighb = DB::table('neighborhoods')
        ->leftJoin('vendors', 'neighborhoods.id', '=', 'vendors.id_neighborhood')
        ->whereNull('vendors.id')
        ->select('neighborhoods.*')
        ->get();

        return response()->json(['status' => true, 'data' => $neighb]);
    }
}
