<?php

/**
 * Add to routes/api.php inside the authenticated API group.
 *
 * Route::middleware('auth:sanctum')->group(function () {
 *     Route::post('/user/location', [UserLocationController::class, 'store']);
 * });
 */

use App\Http\Controllers\Api\UserLocationController;

Route::middleware('auth:sanctum')->post('/user/location', [UserLocationController::class, 'store']);
