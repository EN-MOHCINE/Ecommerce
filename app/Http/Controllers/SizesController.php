<?php

namespace App\Http\Controllers;

use App\Models\Sizes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SizesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getSize()
    {
        $sizes = DB::table('sizes')->select('size_id', 'name_Size')->orderByDesc('name_Size')->get();
        return $sizes;
    }
    function addSizes(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sizeName' => 'required',
        ], [
            'name.required' => 'Please enter a size name.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $size = new Sizes;
        $size->name_Size = $request->sizeName;
        $size->save();
        return 'category was created';
    }
    public function deleteSizes($id)
    {
        $column = Sizes::where('size_id', $id)->first();
        if ($column) {
            $column->delete();
            return response()->json(['message' => 'Column deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Column not found'], 404);
        }
    }
    public function updateSizes(Request $request, $id)
    {
        $column = Sizes::where('size_id', $id)->first();
        if ($column) {
            $column->name_Size = $request->name;
            $column->save();
            return response()->json(['message' => 'Column name updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Column not found'], 404);
        }
    }
    public function createSize(Request $request)
    {
        $category = new Sizes;
        $category->name_Size = $request->name;
        $category->save();
        return response()->json(['message' => 'Size created successfully'], 200);
    }

}
