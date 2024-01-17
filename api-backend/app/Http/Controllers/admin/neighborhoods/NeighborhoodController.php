<?php

namespace App\Http\Controllers\admin\neighborhoods;

use App\Http\Controllers\Controller;
use App\Http\Requests\NeighborhoodRequest;
use App\Models\Neighborhood;
use Illuminate\Http\Request;

class NeighborhoodController extends Controller
{
    public function index(){
        $neighb=Neighborhood::all();
        return response()->json($neighb);
    }

    public function store(NeighborhoodRequest $request){
        $formFields=$request->validated();
        $neighb = Neighborhood::create($formFields);
        return response()->json( $neighb);
    }

    public function show($id){
        $neighb=Neighborhood::find($id);
        return response()->json( $neighb);
    }

    public function update(NeighborhoodRequest $request,$id){
        $formFields = $request->validated();
        $neighb=Neighborhood::find($id);
        $neighb->update($formFields);

        return response()->json(['status' => true, 'message' => 'Category Updated Successfully']);
    }

    public function destroy($id){
        $neighb=Neighborhood::findOrFail($id);
        $neighb->delete();
        return response()->json(null, 204);
    }
}
