<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Mail\emailCheckout;
use Illuminate\Http\Request;
use App\Models\confirmOreders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ConfirmOredersController extends Controller
{
    function checkOut(Request $request)
    {
        $rules = [
            'name' => 'required',
            'Lname' => 'required',
            'streetAdress' => 'required',
            'city' => 'required',
            'postCode' => 'required',
            'phone' => 'required',
            'email' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->all()
            ]);
        }
        foreach ($request->products as $product) {
            confirmOreders::create([
                'user_id' => $request->user_id,
                'product_id' => json_decode($product)->product_id,
                'quantity' => json_decode($product)->quantity,
            ]);
        }
        User::where('user_id', $request->user_id)->update([
            'address' => $request->streetAdress,
            'code_postal' => $request->postCode,
            'phone' => $request->phone,
            'city' => $request->city
        ]);
        

        return response()->json([
            'status' => 'success',
            'message' => 'waiting the confirmation message'
        ]);
    }

    function commands()
    {
        $orders = ConfirmOreders::join('products', 'products.product_id', '=', 'confirm_oreders.product_id')
            ->select('confirm_oreders.id', 'products.name', 'confirm_oreders.quantity', 'confirm_oreders.created_at')
            ->paginate(10);
        return $orders;
    }
    function detailsCommand($id = null)
    {
       $command= DB::table('confirm_oreders')
        ->join('products', 'products.product_id', 'confirm_oreders.product_id')
        ->join('users', 'users.user_id', 'confirm_oreders.user_id')
        ->select('products.quantity as productQuantity','products.product_id as productId','products.name as productName','products.picture_path','confirm_oreders.quantity as orderQuantity','users.user_id as userId','users.name as userName','users.city','users.address','users.phone','users.email')
        ->where('confirm_oreders.id',$id)
        ->get();
        return $command;
    }
}
