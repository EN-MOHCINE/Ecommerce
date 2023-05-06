<?php

namespace App\Http\Controllers;


use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    function getCategories($id = null)
    {
        if ($id === null) {
            $Category = DB::table('categories')->select('name_Category', 'category_id', 'path_name')->get();
            return $Category;
        } else if ($id === 'all') {
            return 'all';
        } else {
            $Category = DB::table('categories')->select('name_Category')->where('category_id', $id)->get();
            return $Category[0]->name_Category;
        }
    }
    function DropDownMenu()
    {
        $categories = DB::table('Categories')->select('name_Category', 'category_id')->get();
        return response()->json($categories);
    }
    function addCategories(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoryName' => 'required',
        ], [
            'name.required' => 'Please enter a category name.',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $categories = new Category;
        $categories->name_Category = $request->categoryName;
        $categories->save();
        return 'category was created';
    }
    public function deleteCategories($id)
    {
        $column = Category::where('category_id', $id)->first();
        if ($column) {
            $column->delete();
            return response()->json(['message' => 'Column deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Column not found'], 404);
        }
    }
    public function updateCategories(Request $request, $id = null)
    {
        $column = Category::where('category_id', $id)->first();
        if ($column) {
            $column->name_Category = $request->name;
            $column->save();
            return response()->json(['message' => 'Column name updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Column not found'], 404);
        }
    }
    public function createCategory(Request $request)
    {
        $category = new Category;
        $category->name_Category = $request->name;
        $category->save();
        return response()->json(['message' => 'Category created successfully'], 200);
    }
}
