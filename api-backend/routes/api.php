<?php

use App\Http\Controllers\admin\categories\CategoryController;
use App\Http\Controllers\admin\dash\DashboardController;
use App\Http\Controllers\admin\neighborhoods\NeighborhoodController;
use App\Http\Controllers\admin\products\ProductController;
use App\Http\Controllers\admin\users\delivery_man\Delivery_manController;
use App\Http\Controllers\SuperAdmin\admin\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\vendor\clients\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('dashboard', DashboardController::class);

    Route::apiResource('category', CategoryController::class);
    Route::apiResource('product', ProductController::class);
    Route::apiResource('neighborhood', NeighborhoodController::class);

    //vendor
    Route::apiResource('client',ClientController::class);

    // Route pour envoyer une nouvelle notification de vérification d'e-mail
    Route::post('/email/verification-notification', function (\Illuminate\Http\Request $request) {
        $request->user()->sendEmailVerificationNotification();

        return response()->json(['message' => 'Verification link sent!']);
    })->middleware(['throttle:6,1'])->name('verification.send');

    // Route pour traiter la vérification d'e-mail
    Route::post('/email/verify/{id}/{hash}', function (\Illuminate\Foundation\Auth\EmailVerificationRequest $request, $id, $hash) {
        $request->fulfill();

        return response()->json(['message' => 'Email successfully verified.']);
    })->name('verification.verify');
});    Route::apiResource('deliveryMan', Delivery_manController::class);
Route::apiResource('admin',AdminController::class);
Route::post('/register', [UserController::class, "register"]);
Route::post('/login', [UserController::class, "login"]);
