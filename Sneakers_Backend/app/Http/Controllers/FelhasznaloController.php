<?php

namespace App\Http\Controllers;

use App\Models\Felhasznalo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FelhasznaloController extends Controller
{
    public function index()
    {
        return response()->json(Felhasznalo::all());
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $credentials = [
                'email' => $request->email,
                'password' => $request->password
            ];

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();

                return response()->json([
                    'success' => true,
                    'user' => Auth::user(),
                    'message' => 'Sikeres bejelentkezés!'
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Hibás e-mail cím vagy jelszó!'
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Szerver hiba történt!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Sikeres kijelentkezés!'
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string|max:255',
            'email' => 'required|email|unique:felhasznalos,email',
            'jelszo' => 'required|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $felhasznalo = Felhasznalo::create($validated);

        return response()->json($felhasznalo, 201);
    }

    public function show(string $id)
    {
        return response()->json(Felhasznalo::findOrFail($id));
    }

    public function showProfile(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Nincs bejelentkezve'], 401);
        }
        return response()->json($user);
    }

    public function currentUser(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Nincs bejelentkezve'], 401);
        }

        $user->load('role');

        $roleName = match ((int)$user->role_id) {
            1 => 'admin',
            2 => 'felhasznalo',
            default => 'ismeretlen',
        };

        return response()->json([
            'id' => $user->felhasznalo_id,
            'name' => $user->nev,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'role' => $roleName,
        ]);
    }
}