<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateRequest;
use App\Models\Product;
use Faker\Core\Number;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    function addProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'productPicture.*' => 'required|image|mimes:jpeg,png,jpg',
            'quantity' => 'required|integer',
            'description' => 'required',
            'category_id' => 'required',
            'size_id' => 'required',
            'collection_id' => 'required',
            'promotion'=>'required'
        ], [
            'name.required' => 'Please enter a product name.',
            'price.required' => 'Please enter a price',
            'productPicture.required' => 'Please upload a picture.',
            'productPicture.image' => 'The picture must be an image file.',
            'productPicture.mimes' => 'The picture must be a file of type: jpeg, png, jpg.',
            'quantity.required' => 'Please enter a quantity',
            'quantity.integer' => 'Please enter a quantity integer',
            'description.required' => 'Please enter the description for product',
            'category_id.required' => 'Please enter the category for product ',
            'size_id.required' => 'Please enter the size for product ',
            'collection_id.required' => 'Please enter the collection for product ',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $product = new Product;
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->quantity = $request->input('quantity');
        $product->category_id = $request->input('category_id');
        $product->size_id = $request->input('size_id');
        $product->collection_id = $request->input('collection_id');
        $product->promotion = $request->input('promotion');
        $product->tags = $request->input('tags');
        if ($request->hasFile('productPictures')) {
            $productPictures = $request->file('productPictures');
            $images = [];

            foreach ($productPictures as $picture) {
                $imageName = time() . $picture->getClientOriginalName();
                $picture->move(public_path('pictures'), $imageName);
                $images[] = $imageName;
            }

            $product->picture_path = json_encode($images);
        }

        $product->save();
        return response()->json(['message' => 'Product created successfully'], 200);
    }

    function Product($id = null, $size = null, $price = null, $stock = null)
    {
        $result = array();
        $products = DB::table('products')
            ->join('categories', 'categories.category_id', '=', 'products.category_id')
            ->join('sizes', 'sizes.size_id', '=', 'products.size_id')
            ->select('name', DB::raw('MIN(picture_path) as picture'), 'price', DB::raw('MAX(promotion) as promotion'), 'name_Category', DB::raw('MIN(products.created_at) as created_at'), DB::raw('MIN(products.product_id) as product_id'))
            ->groupBy('name', 'price', 'name_Category')
            ->orderBy('created_at', 'desc');

        if ($id !== null && $id !== 'all') {
            $products->where('products.category_id', $id);
        }

        if ($price !== 'all' && $price !== null) {
            list($minVal, $maxVal) = explode('-', $price);
            $products->whereBetween('price', [(int) $minVal, (int) $maxVal]);
        }

        if ($size !== 'all' && $size !== null) {
            $products->where('sizes.size_id', '=', (int) $size);
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
                'category' => $product->name_Category,
                'sizes' => $sizes,
                'promotion'=>$product->promotion,
                'all' => $products->lastPage()
            );
        }

        return response()->json($result);
    }

    public function productDetails($id)
    {
        $productName = DB::table('products')
            ->select('name')
            ->where('product_id', $id)
            ->get();

        $productDetails = DB::table('products')
            ->select('name', 'picture_path as pictures', 'quantity', 'promotion','description', 'price')
            ->where('name', $productName[0]->name)
            ->groupBy('name', 'picture_path', 'quantity', 'description', 'price', 'promotion')
            ->get();
        $productSize = DB::table('products')
            ->join('sizes', 'sizes.size_id', 'products.size_id')
            ->select('name_Size', 'product_id')
            ->where('name', $productDetails[0]->name)
            ->get();
        $result = [
            'productDetails' => $productDetails[0],
            'productSize' => $productSize
        ];

        return $result;
    }

    function search($key = null, $size = null, $price = null, $stock = null)
    {
        $result = array();
        $products = DB::table('products')
            ->join('categories', 'categories.category_id', '=', 'products.category_id')
            ->join('sizes', 'sizes.size_id', '=', 'products.size_id')
            ->select('name', DB::raw('MIN(picture_path) as picture'), 'price', DB::raw('MAX(promotion) as promotion'), 'name_Category', DB::raw('MIN(products.created_at) as created_at'), DB::raw('MIN(products.product_id) as product_id'))
            ->groupBy('name', 'price', 'name_Category')
            ->whereJsonContains('tags', ['tag' => $key])
            ->orderBy('created_at', 'desc');
        if ($price !== 'all' && $price !== null) {
            list($minVal, $maxVal) = explode('-', $price);
            $products->whereBetween('price', [(int) $minVal, (int) $maxVal]);
        }

        if ($size !== 'all' && $size !== null) {
            $products->where('sizes.size_id', '=', (int) $size);
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
            $sizes = DB::table('products')
                ->join('sizes', 'sizes.size_id', '=', 'products.size_id')
                ->select('sizes.name_Size')
                ->where('products.product_id', $product->product_id)
                ->get();

            $sizesArray = array();
            foreach ($sizes as $size) {
                $sizesArray[] = $size->name_Size;
            }
            $result[] = array(
                'id' => $product->product_id,
                'name' => $product->name,
                'picture' => $product->picture,
                'price' => $product->price,
                'category' => $product->name_Category,
                'promotion'=>$product->promotion,
                'sizes' => $sizes,
                'all' => $products->lastPage()
            );
        }

        return response()->json($result);
    }
    function allProducts($size = null, $price = null, $stock = null)
    {
        $allproducts = DB::table('products')
            ->join('sizes', 'sizes.size_id', '=', 'products.size_id')
            ->join('categories', 'categories.category_id', '=', 'products.category_id')
            ->join('collections', 'collections.collection_id', '=', 'products.collection_id')
            ->select('products.product_id as id', 'name', 'price', 'quantity', 'picture_path as pictures', 'name_Category as category', 'collection_name as collection', 'name_Size as size');
        if ($price !== 'all' && $price !== null) {
            list($minVal, $maxVal) = explode('-', $price);
            $allproducts->whereBetween('price', [(int) $minVal, (int) $maxVal]);
        }
        if ($size !== 'all' && $size !== null) {
            $allproducts->where('sizes.size_id', '=', (int) $size);
        }
        if ($stock !== 'all' && $stock !== null) {
            if ($stock === '1') {
                $allproducts->where('products.quantity', '>', 0);
            } else {
                $allproducts->where('products.quantity', 0);
            }
        }
        $allproducts = $allproducts->paginate(9);
        return $allproducts;
    }
    function delete($id = null)
    {

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Product not found.'], 404);
        }

        // Delete product images from server
        $images = json_decode($product->picture_path);
        foreach ($images as $image) {
            $path = public_path('pictures/' . $image);
            if (file_exists($path)) {
                unlink($path);
            }
        }

        // Delete product record from database
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }

    function edite($id = null)
    {
        $product = Product::where('product_id', $id)->get();
        return $product;
    }
    function updateProduct(UpdateRequest $request)
    {
        $product = Product::where('product_id', $request->id)->first();
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->quantity = $request->input('quantity');
        $product->category_id = $request->input('category_id');
        $product->size_id = $request->input('size_id');
        $product->collection_id = $request->input('collection_id');
        $product->tags = $request->input('tags');
        $product->promotion = $request->input('promotion');

        if ($request->hasFile('productPictures')) {
            $productPictures = $request->file('productPictures');
            $images = [];

            foreach ($productPictures as $picture) {
                $imageName = time() . $picture->getClientOriginalName();
                $picture->move(public_path('pictures'), $imageName);
                $images[] = $imageName;
            }

            $product->picture_path = json_encode($images);
        }

        $product->save();

        return response()->json(['message' => 'Product updated successfully'], 200);
    }
    
}
