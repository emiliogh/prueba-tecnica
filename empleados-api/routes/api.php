
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\FamiliarDirectoController;
use App\Http\Middleware\JwtAuthMiddleware;

Route::post('oauth2/token', [TokenController::class, 'issue']);

Route::middleware('jwt.auth')->group(function () {
    Route::apiResource('empleados', EmpleadoController::class);
    // Endpoint para familiares de un empleado
    Route::get('empleados/{id}/familiares', [FamiliarDirectoController::class, 'index']);
    Route::post('empleados/{id}/familiares', [FamiliarDirectoController::class, 'store']);
    Route::delete('familiares/{id}', [FamiliarDirectoController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
