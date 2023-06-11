<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bankaccounts extends Model
{
    use HasFactory;
    protected $fillable=[
        'cardNumber',
        'expDate',
        'cvv',
        'solde',
    ];
}
