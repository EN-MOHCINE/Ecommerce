<?php

namespace App\Http\Controllers;

use App\Models\bankaccounts;
use App\Models\confirmOreders;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

use Illuminate\Database\QueryException;
use Illuminate\Http\Response;

class SuppCommandeController extends Controller
{
    public function SuppCommande($id)
    {
        try {
            $commande = confirmOreders::findOrFail($id);
            $price =  $commande->total;

            $cardNumber = $commande->cardnumber;
            

            bankaccounts::where('cardNumber', $cardNumber)
                ->increment('solde', $price);

            $commande->delete();

            return response()->json(['message' => 'Order deleted successfully.']);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Error deleting the order.']);
        }
    }


}
