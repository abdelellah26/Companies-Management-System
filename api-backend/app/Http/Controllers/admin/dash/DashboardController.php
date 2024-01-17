<?php

namespace App\Http\Controllers\admin\dash;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $product=Product::all();
        return response()->json($product);

    }
}
