<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'min:6', 'confirmed'],
        ]);

        $request->user()->update([
            'jelszo' => Hash::make($validated['password']), 
        ]);

        return response()->json([
            'message' => 'Jelszó sikeresen módosítva!',
            'status' => 'password-updated'
        ], 200);
    }
}
