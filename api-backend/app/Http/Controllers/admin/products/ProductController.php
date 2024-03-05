<?php

namespace App\Http\Controllers\admin\products;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function index(){
        $products = DB::table('products')
            ->join('categories', 'products.id_category', '=', 'categories.id')
            ->whereNull('products.deleted_at')
            ->select(
                'products.id',
                'products.name',
                'products.pic',
                'products.quantity',
                'products.sku',
                'products.moyen_purchase_price',
                'products.selling_price',
                'categories.name as category'
            )
            ->get();
            $products->transform(function ($product) {
                $product->pic = asset('storage/' . str_replace('public/', '', $product->pic));
                return $product;
            });

    return response()->json(['status' => true, 'data' => $products]);
    }


    public function store(ProductRequest $request){
        $formFields=$request->validated();
        if ($request->hasFile('pic')) {
            $completeFileName=$request->file('pic')->getClientOriginalName();
            $fileNameOnly=pathinfo($completeFileName, PATHINFO_FILENAME);
            $extenshion= $request->file('pic')->getClientOriginalExtension();
            $comPic=str_replace(' ', '_', $fileNameOnly).'-'.rand() . '_'.time(). '.'.$extenshion;
            $formFields['pic']=$request->file('pic')->storeAs('public/images/products',$comPic);
            $req=Product::create($formFields);
        }
        if($req->save()){
            return['status'=>true,'message'=>'Product Saved Successfully'];
        }else{
            return['status'=>false,'message'=>'Somethind Went Wrong'];
        }
    }

    public function show($id){
        $categorie = Category::all();
        $products = DB::table('products')
        ->join('categories', 'products.id_category', '=', 'categories.id')
        ->whereNull('products.deleted_at')
        ->select(
            'products.id',
            'products.name',
            'products.pic',
            'products.sku',
            'products.selling_price',
            'products.minimum_quantity',
            'products.moyen_purchase_price',
            'categories.name as category'
        )
        ->get();
        return response()->json(['products'=>$products,'categorie'=>$categorie]);
    }

    public function update(ProductRequest $request,$id){
        $formFields=$request->validated();
        $product=Product::find($id);

        // Calcul de la nouvelle moyenne
        $moyen_pur = $product->moyen_purchase_price;
        $moyen = ($moyen_pur + $formFields['moyen_purchase_price']) / 2;

        // Calcul de la nouvelle quantité
        $last_quantity = $product->quantity;
        $quantity = $last_quantity + $formFields['quantity'];

                // Si une nouvelle image est fournie, effectuez la mise à jour de l'image
                if ($request->hasFile('pic')) { 
                    // Logique de traitement de l'image similaire à celle dans la méthode store()
                    $completeFileName = $request->file('pic')->getClientOriginalName();
                    $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                    $extension = $request->file('pic')->getClientOriginalExtension();
                    $comPic = str_replace(' ', '_', $fileNameOnly) . '-' . rand() . '_' . time() . '.' . $extension;
                    $formFields['pic'] = $request->file('pic')->storeAs('public/images/categories', $comPic);

                    // Supprimez l'ancienne image si elle existe
                    if ($product->pic) {
                        Storage::delete($product->pic);
                    }

                    // Mettez à jour le champ de l'image
                    $product->pic = $formFields['pic'];

                }


        // Mettez à jour les autres champs du modèle
        $product->moyen_purchase_price=$moyen;
        $product->quantity=$quantity;
        $product->save();

        return response()->json(['status' => true, 'message' => 'Product Updated Successfully']);
    }

    public function destroy($id){
        $product =Product::findOrFail($id);
                // Supprimez l'image associée à la catégorie du système de fichiers
                if ($product->pic) {
                    Storage::delete($product->pic);
                }

                // Supprimez la catégorie de la base de données
                if ($product->delete()) {
                    return response()->json(['status' => true, 'message' => 'Product Deleted Successfully']);
                } else {
                    return response()->json(['status' => false, 'message' => 'Something Went Wrong'], 500);
                }

    }


}
