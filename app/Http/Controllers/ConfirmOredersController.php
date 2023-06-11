<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Mail\emailCheckout;
use App\Models\bankaccounts;
use App\Models\Cart;
use Illuminate\Http\Request;
use App\Models\confirmOreders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Psy\Readline\Hoa\Console;

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
        return response()->json([
            'status' => 'success',
            
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
        $command = DB::table('confirm_oreders')
            ->join('products', 'products.product_id', 'confirm_oreders.product_id')
            ->join('users', 'users.user_id', 'confirm_oreders.user_id')
            ->select('products.quantity as productQuantity', 'products.product_id as productId', 'products.name as productName', 'products.picture_path', 'confirm_oreders.quantity as orderQuantity', 'users.user_id as userId', 'users.name as userName', 'users.city', 'users.address', 'users.phone', 'users.email','cardnumber')
            ->where('confirm_oreders.id', $id)
            ->get();
        return $command;
    }
    function confirmPaymentMethod(Request $request)
    {   $card_number = $request->numberCard;
        $method = ($request->selectedOption === 'creditCard') ? $request->selectedOption : 'cashOnDelivery';
        if ($request->products['product_id']) {
            confirmOreders::create([
                'user_id' => $request->user_id,
                'product_id' => (int) $request->products['product_id'],
                'quantity' => (int) $request->products['quantity'],
                'total' => (int) $request->products['total'],
                'method' => $method,
                'cardnumber' => (int) $card_number
            ]);
        } else {
            foreach ($request->products as $product) {
                confirmOreders::create([
                    'user_id' => $request->user_id,
                    'product_id' => (int) $product['product_id'],
                    'quantity' => (int) $product['quantity'],
                    'total' => (int) $product['total'],
                    'method' => $method,
                    'cardnumber' => (int) $card_number
                ]);
            }}
            User::where('user_id', $request->user_id)->update([
                'address' => $request->streetAdress,
                'code_postal' => $request->postCode,
                'phone' => $request->phone,
                'city' => $request->city
            ]);
            Cart::where("user_id", $request->user_id)->delete();
            if ($method === 'creditCard') {
                $total = 0;
                if ($request->products['product_id']) {
                    $total += (int) $request->products['total'];
                } else {
                foreach ($request->products as $product) {
                    $total += (int) $product['total'];
                }}
                $card_number = $request->numberCard;
                $bankAccount = bankaccounts::where('cardNumber', $card_number)->first();
                if ($bankAccount) {
                    $balance = $bankAccount->solde;

                    if ($balance >= $total) {
                        $newBalance = $balance - $total;
                        $bankAccount->solde = $newBalance;
                        $bankAccount->save();
                        return response()->json(['message' => "the paiment is through wait for the confirmation from admin", "success" => true]);
                    } else {
                        return response()->json(['message' => 'Insufficient funds'], 400);
                    }
                } else {
                    return response()->json(['message' => 'Card not found'], 404);
                }
            }
           
            return  response()->json(['message' => "hahiya jaya ldar", "success" => true]);
        
    }
}
