<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     function Cart(Request $request){
        if ($request->product_id) {
            Cart::create([
                'user_id'=>$request->user_id,
                'product_id'=>$request->product_id,
                'quantity'=>$request->quantity
            ]);
        }
        $product = Cart::join('products', 'products.product_id', '=', 'carts.product_id')
        ->join('sizes', 'sizes.size_id', '=', 'products.size_id')
        ->select(
            'cart_id', 'user_id', 'picture_path as picture', 'sizes.name_Size as size', 
            'price', 'name','promotion', 'products.product_id', 'carts.quantity', 
            'products.quantity as productQuantity'
        )
        ->where('user_id', $request->user_id)
        ->get();
    
        return $product;
    }
    
    function deleteCart($id){
        Cart::where('cart_id',$id)->delete();
    }
    function countCart($id){
        $count = Cart::where('user_id', $id)->count();
        return $count;
    }
    function checkOut($id){
        $products = Cart::join('products', 'products.product_id', '=', 'carts.product_id')
        ->join('sizes', 'sizes.size_id', '=', 'products.size_id')
        ->select(
            'cart_id', 'user_id', 'picture_path as picture', 'sizes.name_Size as size', 
            'price','name','promotion','products.product_id', 'carts.quantity',
        )
        ->where('user_id', $id)
        ->get();
        return $products;
    }
    function update(Request $request){
        $cartData = $request->all();
        $cartItems = $cartData['productsCart'];
        foreach($cartItems as $item){
            $cart = Cart::where('cart_id', $item['cart_id'])->first();
            $cart->quantity = $item['quantity'];
            $cart->save();
        }
        return response()->json(['message' => 'Cart updated successfully']);
    }
}
