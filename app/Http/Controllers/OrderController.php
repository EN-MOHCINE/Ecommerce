<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Mail\emailCheckout;
use Illuminate\Http\Request;
use App\Models\confirmOreders;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    function confirmedOrder(Request $request)
    {
        Order::create([
            'user_id' => $request->userId,
            'product_id'=>$request->productId,
            'quantity'=>$request->quantity
        ]);
        $datalist = [
            'email' => $request->email,
            'name' => $request->name,
            'streetAddress' => $request->address,
            'productName'=>$request->productName,
            'quantity'=>$request->quantity
        ];

        Mail::to($request->email)->send(new emailCheckout($datalist));
        
        $product = confirmOreders::where('id', $request->orderId)->get();
        $p = Product::where('product_id', $product->product_id)->first();
        $p->quantity = $p->quantity - $product->quantity;
        $p->save();
        
        confirmOreders::where('id', $request->orderId)->delete();
        return 'the command was confirmed successfully';
       
        
    }
}
