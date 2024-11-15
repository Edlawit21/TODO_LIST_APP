<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;

// Authentication route for users
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// TODO List API routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/todos', [TodoController::class, 'index']);       
    Route::post('/todos', [TodoController::class, 'store']);        
    Route::put('/todos/{id}', [TodoController::class, 'update']);   
    Route::delete('/todos/{id}', [TodoController::class, 'destroy']); 
});

//Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');