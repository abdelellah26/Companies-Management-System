<?php

namespace App\Http\Controllers\admin\categories;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(CategoryRequest $request) {
        $formFields=$request->validated();

        if ($request->hasFile('pic')) {
            $completeFileName=$request->file('pic')->getClientOriginalName();
            $fileNameOnly=pathinfo($completeFileName, PATHINFO_FILENAME);
            $extenshion= $request->file('pic')->getClientOriginalExtension();
            $comPic=str_replace(' ', '_', $fileNameOnly).'-'.rand() . '_'.time(). '.'.$extenshion;
            $formFields['pic']=$request->file('pic')->storeAs('public/images/categories',$comPic);
            $category = Category::create($formFields);
        }

        if($category->save()){
            return['status'=>true,'message'=>'Category Saved Successfully'];
        }else{
            return['status'=>false,'message'=>'Somethind Went Wrong'];
        }

    }

    public function show($id){
        $categories=Category::find($id);
        return  response()->json($categories);
    }

    public function update(CategoryRequest $request, $id) {
        $formFields = $request->validated();
        $category = Category::find($id);

        // Si une nouvelle image est fournie, effectuez la mise à jour de l'image
        if ($request->hasFile('pic')) {
            // Logique de traitement de l'image similaire à celle dans la méthode store()
            $completeFileName = $request->file('pic')->getClientOriginalName();
            $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
            $extension = $request->file('pic')->getClientOriginalExtension();
            $comPic = str_replace(' ', '_', $fileNameOnly) . '-' . rand() . '_' . time() . '.' . $extension;
            $formFields['pic'] = $request->file('pic')->storeAs('public/images/categories', $comPic);

            // Supprimez l'ancienne image si elle existe
            if ($category->pic) {
                Storage::delete($category->pic);
            }

            // Mettez à jour le champ de l'image
            $category->pic = $formFields['pic'];
        }

        // Mettez à jour les autres champs du modèle
        $category->update($formFields);

        return response()->json(['status' => true, 'message' => 'Category Updated Successfully']);
    }


    public function destroy($id) {
        $category = Category::findOrFail($id);

        // Supprimez l'image associée à la catégorie du système de fichiers
        if ($category->pic) {
            Storage::delete($category->pic);
        }

        // Supprimez la catégorie de la base de données
        if ($category->delete()) {
            return response()->json(['status' => true, 'message' => 'Category Deleted Successfully']);
        } else {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong'], 500);
        }
    }

}
