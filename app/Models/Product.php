<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'price',
        'picture_path',
        'description',
        'category_id',
        'size_id',
        'collection_id',
        'quantity',
        'tags',
        'promotion'
    ];
    protected $primaryKey = 'product_id';
    protected $casts = [
        'tags' => 'json',
    ];
}
