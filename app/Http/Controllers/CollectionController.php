<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CollectionController extends Controller
{
    function getCollections($id = null)
    {
        if ($id === null) {
            $collection = DB::table('collections')->select('collection_name', 'collection_id', 'path_name')->get();
            return $collection;
        } else if ($id === 'all') {
            return 'all';
        } else {
            $collection = DB::table('collections')->select('collection_name')->where('collection_id', $id)->get();
            return $collection[0]->collection_name;
        }
    }
    function DropDownMenu()
    {
        $collections = DB::table('collections')
            ->select('collection_id', 'collection_name')
            ->get();
        return $collections;
    }
    function Product($id = null, $size = null, $price = null, $stock = null)
    {
        $result = array();
        $products = DB::table('products')
            ->join('collections', 'collections.collection_id', '=', 'products.collection_id')
            ->select('name', DB::raw('MIN(picture_path) as picture'), 'price', DB::raw('MAX(promotion) as promotion'), 'collection_name', DB::raw('MIN(products.created_at) as created_at'), DB::raw('MIN(products.product_id) as product_id'))
            ->groupBy('name', 'price', 'collection_name')
            ->orderBy('created_at', 'desc');
        if ($id === null) {
            $products->skip(0)->take(8);
        }
        if ($id !== null) {
            $products->where('products.collection_id', $id);
        }
        if ($price !== 'all' && $price !== null) {
            list($minVal, $maxVal) = explode('-', $price);
            $products->where('price', '>=', intval($minVal))
                ->where('price', '<=', intval($maxVal));
        }
        if ($size !== 'all' && $size !== null) {
            $products->where('size_id', '=', (int) $size);
        }
        if ($stock !== 'all' && $stock !== null) {
            if ($stock === '1') {
                $products->where('products.quantity', '>', 0);
            } else {
                $products->where('products.quantity', 0);
            }
        }
        $products = $products->paginate(9);
        foreach ($products as $product) {
            $size_ids = DB::table('sizes')
                ->join('products', 'products.size_id', '=', 'sizes.size_id')
                ->select('sizes.name_Size')
                ->where('products.name', $product->name)
                ->get();
            $sizes = array();
            foreach ($size_ids as $size_id) {
                $sizes[] = $size_id->name_Size;
            }
            $result[] = array(
                'id' => $product->product_id,
                'name' => $product->name,
                'picture' => $product->picture,
                'price' => $product->price,
                'collection' => $product->collection_name,
                'promotion' => $product->promotion,
                'sizes' => $sizes,
                'all' => $products->lastPage()
            );
        }

        return response()->json($result);
    }
    function addCollections(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'collectionName' => 'required',
        ], [
            'name.required' => 'Please enter a collection name.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $collection = new Collection;
        $collection->collection_name = $request->collectionName;
        $collection->save();
        return 'category was created';
    }
    public function deleteCollections($id)
    {
        $column = Collection::where('collection_id', $id)->first();
        if ($column) {
            $column->delete();
            return response()->json(['message' => 'Column deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Column not found'], 404);
        }
    }
    public function updateCollections(Request $request, $id)
    {
        $column = Collection::where('collection_id', $id)->first();
        if ($column) {
            $column->collection_name = $request->name;
            $column->save();
            return response()->json(['message' => 'Column name updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Column not found'], 404);
        }
    }
    public function createCollection(Request $request)
    {
        $category = new Collection;
        $category->collection_name = $request->name;
        $category->save();
        return response()->json(['message' => 'Collection created successfully'], 200);
    }

}
