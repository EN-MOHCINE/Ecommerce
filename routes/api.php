<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SizesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ConfirmOredersController;
use App\Http\Controllers\RolesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('dropDownCollections',[CollectionController::class,'DropDownMenu']);
Route::get('dropDownCategories',[CategoryController::class,'DropDownMenu']);
Route::get('categories/{id?}',[CategoryController::class,'getCategories']);
Route::get('collections/{id?}',[CollectionController::class,'getCollections']);
Route::get('size',[SizesController::class,'getSize']);
Route::post('Product',[ProductController::class,'addProduct']);
Route::get('ProductDetails/{id}',[ProductController::class,'productDetails']);
Route::get('category/{id?}/{size?}/{price?}/{stock?}',[ProductController::class,'Product']);
Route::get('allProducts/{size?}/{price?}/{stock?}/{categorySelect?}/{collectionSelect?}',[ProductController::class,'allProducts']);
Route::get('collection/{id?}/{size?}/{price?}/{stock?}',[CollectionController::class,'Product']);
Route::post('signUp',[UserController::class,'register']);
Route::post('signIn',[UserController::class,'login']);
Route::post('message', [ContactController::class,'sendEmail']);
Route::post('Cart',[CartController::class , 'Cart']);
Route::delete('Cart/{id}',[CartController::class,'deleteCart']);
Route::get('Cart/{id}',[CartController::class,'checkOut']);
Route::get('countCart/{id}',[CartController::class,'countCart']);
Route::patch('Cart', [CartController::class, 'update']);
Route::post('CheckOut', [ConfirmOredersController::class, 'checkOut']);
Route::get('commands', [ConfirmOredersController::class, 'commands']);
Route::get('detailsCommand/{id}', [ConfirmOredersController::class, 'detailsCommand']);
Route::get('search/{key?}/{size?}/{price?}/{stock?}', [ProductController::class,'search']);
Route::delete('product/{id}',[ProductController::class,'delete']);
Route::get('product/{id}',[ProductController::class,'edite']);
Route::patch('product',[ProductController::class,'updateProduct']);
Route::post('confirmOrder',[OrderController::class,'confirmedOrder'])->name('confiremd');
Route::post('userFilter/{role?}/{name?}',[RolesController::class,'userFilter']);
Route::post('collection',[CollectionController::class,'createCollection']);
Route::post('category',[CategoryController::class,'createCategory']);
Route::post('size',[SizesController::class,'createSize']);
Route::delete('collection/{id}',[CollectionController::class,'deleteCollections']);
Route::delete('category/{id}',[CategoryController::class,'deleteCategories']);
Route::delete('size/{id}',[SizesController::class,'deleteSizes']);
Route::patch('collection/{id}',[CollectionController::class,'updateCollections']);
Route::patch('category/{id}',[CategoryController::class,'updateCategories']);
Route::patch('size/{id}',[SizesController::class,'updateSizes']);
Route::get('roles',[RolesController::class,'getRoles']);
Route::patch('roles/{id}',[UserController::class,'updateRole']);
Route::get('orders_user/{id}' ,[OrderController ::class ,"orders_user"]) ;

