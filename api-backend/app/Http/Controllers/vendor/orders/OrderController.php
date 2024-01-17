<?php

namespace App\Http\Controllers\vendor\orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\vendor\OrderRequest;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(){
        // Utilisation de la jointure pour récupérer les données des utilisateurs avec les noms des quartiers
        $order = DB::table('orders')
        ->join('clients', 'orders.id_client', '=', 'clients.id')
        ->join('neighborhoods','neighborhoods.id','=','clients.id_neighborhood')
        ->select(
            'name.clients',
            'neighborhoods.name',
            'orders.total',
            'orders.paid'
        )
        ->get();

        return response()->json(['status' => true, 'data' => $order]);
    }

    public function store(OrderRequest $request){
        $formFields=$request->validated();
        $order=Order::create($formFields);
        return response()->json( $order);
    }

    public function show($id){
        $order=Order::find($id);
        return response()->json( $order);
    }

    public function update(OrderRequest $request,$id){
        $formFields = $request->validated();
        $order=Order::find($id);
        $order->update($formFields);
        return response()->json(['status' => true, 'message' => 'Order Updated Successfully']);
    }

    public function destroy($id){
        $order=Order::findOrFail($id);
        $order->delete($id);
        return response()->json(null, 204);
    }
}
