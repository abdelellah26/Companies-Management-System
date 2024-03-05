<?php

namespace App\Http\Controllers\admin\categories;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        $categories->transform(function ($category) {
            $category->pic = asset('storage/' . str_replace('public/', '', $category->pic));
            return $category;
        });
        return response()->json($categories);
    }
    public function store(CategoryRequest $request) {


        try {
            $formFields = [];

            if ($request->hasFile('pic')) {
                $completeFileName = $request->file('pic');
                $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
                $extension = $request->file('pic')->getClientOriginalExtension();
                $comPic = str_replace(' ', '_', $fileNameOnly) . '-' . rand() . '_' . time() . '.' . $extension;
                $formFields['pic'] = $request->file('pic')->storeAs('images/categories', $comPic, 'public');
            }

            $formFields['name'] = $request->input('name');
          
            Category::create($formFields);

            return response()->json(['status' => true, 'message' => 'Category Saved Successfully']);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Something Went Wrong', 'error' => $e->getMessage()], 422);
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
