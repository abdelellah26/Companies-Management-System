<?php

use App\Http\Controllers\SuperAdmin\admin\AdminController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\neighborhoods\NeighborhoodController;
use App\Http\Controllers\admin\products\ProductController;
use App\Http\Controllers\admin\categories\CategoryController;
use App\Http\Controllers\admin\dash\DashboardController;
use App\Http\Controllers\admin\neighborhoods\deliveryMan\NeighborhoodDMController;
use App\Http\Controllers\admin\neighborhoods\vendor\NeighborhoodVendorController;
use App\Http\Controllers\admin\products\productDetail\yearController;
use App\Http\Controllers\admin\profil\ProfileController;
use App\Http\Controllers\admin\users\delivery_man\Delivery_manController;
use App\Http\Controllers\admin\users\vendors\VendorController;
use App\Http\Controllers\vendor\clients\ClientController;
use App\Http\Controllers\vendor\orders\OrderController;

// Routes publiques sans middleware d'authentification
Route::apiResource('admin', AdminController::class);
Route::post('/register', [UserController::class, "register"]);
Route::post('/login', [UserController::class, "login"]);



// Routes pour l'administration avec AdminAuthMiddleware
Route::middleware(["auth:sanctum", "type.admin"])->group(function () {
    Route::apiResource('dashboard', DashboardController::class);
    Route::apiResource('order', OrderController::class);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('product', ProductController::class);
    Route::apiResource('neighborhood', NeighborhoodController::class);
    Route::apiResource('client', ClientController::class);
    Route::apiResource('deliveryMan', Delivery_manController::class);
    Route::apiResource('vendor', VendorController::class);
    Route::apiResource('profil', ProfileController::class);
    Route::apiResource('neighborhoodDM',NeighborhoodDMController::class);
    Route::apiResource("neighborhoodVendor",NeighborhoodVendorController::class);

    Route::apiResource("year",yearController::class);

});

Route::middleware(["auth:sanctum","type.vendor"])->prefix("vendor")->group(function () {
    Route::apiResource('client',ClientController::class);
    Route::apiResource('order',OrderController::class);
});
