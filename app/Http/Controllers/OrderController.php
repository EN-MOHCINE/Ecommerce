<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use App\Mail\emailCheckout;
use App\Mail\facture;
use Illuminate\Http\Request;
use App\Models\confirmOreders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    function confirmedOrder(Request $request)
    {
        Order::create([
            'user_id' => $request->userId,
            'product_id'=>$request->productId,
            'quantity'=>$request->quantity,
            "cardnumber" => $request->cardnumber
        ]);
        confirmOreders::where('id',$request->confOrder)->delete();
        $datalist = [
            'name' => $request->name,
            'email'=>$request->email,
            'streetAddress' => $request->address,
            'productName'=>$request->productName,
            'productQuantity'=>$request->quantity,
            'productPrice'=>$request->productPrice,
            'promotion'=>$request->promotion,
        ];

        Mail::to($request->email)->send(new facture($datalist));
        
        $product = confirmOreders::where('id', $request->orderId)->get();
        $p = Product::where('product_id', $product->product_id)->first();

        $p->quantity = $p->quantity - $product->quantity;
        $p->save();
        
        confirmOreders::where('id', $request->orderId)->delete();
        return 'the command was confirmed successfully';
    }

    function  orders_user(Request $request){

        $orders = Order::select('orders.*')
        ->join('users', 'users.user_id', '=', 'orders.user_id')
        ->where('orders.user_id', $request->id)
        ->where('users.role_id', 2)
        ->get();
        return $orders;

    }


    

    function  OrderUser_espace_client ($Role =null ,$id ){
        
        $results = DB::table('orders as u1')
                ->select('u1.*', 'pro.*')
                ->join('products as pro', 'pro.product_id', '=', 'u1.product_id')
                ->where('u1.user_id', $id)
                ->get();


        $result1 = DB::table('confirm_oreders')
                ->join('products', 'products.product_id', '=', 'confirm_oreders.product_id')
                ->select('confirm_oreders.*', 'products.*')
                ->where('confirm_oreders.user_id', $id)
                ->get();
                
            $results = $results->toArray();
            $result1 = $result1->toArray();
            $resulttotal = array_merge($results, $result1);
            shuffle($resulttotal);

            if($Role === "All"){
                            return response()->json(['orders' => $resulttotal]);
            }elseif($Role === "Encours"){
                            return response()->json(['orders' => $result1]);
            }elseif($Role === "Validé"){
                return response()->json(['orders' => $results]);
            }
    
        // return response()->json(['orders' => $results , "Confirm_oreders"=> $result1 ,"Order"=>$resulttotal]);

}

}
