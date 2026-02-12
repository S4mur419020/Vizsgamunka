<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisztracioRequest;
use App\Http\Requests\UpdateRegisztracioRequest;
use App\Models\Regisztracio;
use Illuminate\Http\Request;

class RegisztracioController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json($user, 201);
    }
}
