<?php

namespace App\Http\Controllers\vendor\orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\vendor\DetailOrderRequest;
use App\Http\Requests\vendor\OrderRequest;
use App\Models\DetailOrder;
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

    public function store(OrderRequest $request,DetailOrderRequest $requestDetail){
        $formFields=$request->validated();
        $formFieldDetail=$requestDetail->validated();
        $formFields['status'] = $formFields['status'] ?? 'Pending';
        $order=Order::create($formFields);

            DetailOrder::create([
                'id_product' =>  $formFieldDetail['id_product'],
                'id_order' =>$order->id,
                'quantity' =>  $formFieldDetail['quantity'],
            ]);


        return response()->json(['status' => true, 'message' => 'Order and details created successfully']);
    }

    public function show($id){
        $order=Order::find($id);
        return response()->json( $order);
    }

}
