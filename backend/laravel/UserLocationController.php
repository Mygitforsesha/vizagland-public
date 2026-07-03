<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * POST /api/user/location
 *
 * Stores the authenticated user's captured location after login.
 * Wire this controller into routes/api.php (see routes-snippet.php).
 */
class UserLocationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'village' => ['nullable', 'string', 'max:255'],
            'mandal' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'district' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:255'],
            'pincode' => ['nullable', 'string', 'max:20'],
            'country' => ['nullable', 'string', 'max:255'],
        ]);

        $user = Auth::user();

        $user->update([
            'last_latitude' => $validated['latitude'],
            'last_longitude' => $validated['longitude'],
            'last_village' => $validated['village'] ?? null,
            'last_mandal' => $validated['mandal'] ?? null,
            'last_city' => $validated['city'] ?? null,
            'last_district' => $validated['district'] ?? null,
            'last_state' => $validated['state'] ?? null,
            'last_pincode' => $validated['pincode'] ?? null,
            'last_country' => $validated['country'] ?? null,
            'location_captured_at' => now(),
        ]);

        Log::info('User location captured', [
            'user_id' => $user->id,
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'city' => $validated['city'] ?? null,
            'district' => $validated['district'] ?? null,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Location saved successfully',
            'data' => [
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'village' => $validated['village'] ?? null,
                'mandal' => $validated['mandal'] ?? null,
                'city' => $validated['city'] ?? null,
                'district' => $validated['district'] ?? null,
                'state' => $validated['state'] ?? null,
                'pincode' => $validated['pincode'] ?? null,
                'country' => $validated['country'] ?? null,
            ],
        ]);
    }
}
