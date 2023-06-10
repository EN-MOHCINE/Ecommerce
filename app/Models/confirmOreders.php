<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class confirmOreders extends Model
{
    use HasFactory;
    protected $fillable=[
        'user_id',
        'product_id',
        'quantity',
        'confirmed',
        "method",
        "total"
    ];
}
