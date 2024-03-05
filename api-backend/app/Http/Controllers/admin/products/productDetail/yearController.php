<?php

namespace App\Http\Controllers\admin\products\productDetail;

use App\Http\Controllers\Controller;
use App\Models\DetailOrder;
use Illuminate\Http\Request;

class yearController extends Controller
{
    public function show($id){
        $uniqueYears = DetailOrder::where('id_product', $id)
            ->selectRaw('DISTINCT YEAR(created_at) as year')
            ->pluck('year');
            return response()->json(['products'=>$uniqueYears]);
       }
}
