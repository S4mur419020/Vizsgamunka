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
        // 1. Validáció
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

            // 4. Hibás adatok
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
    public function getAuthPassword()
    {
        return $this->jelszo; 
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
            'email' => 'required|email|unique:felhasznalok,email',
            'jelszo' => 'required|string|min:6',
        ]);

        $validated['jelszo'] = Hash::make($validated['jelszo']);
        $felhasznalo = Felhasznalo::create($validated);

        return response()->json($felhasznalo, 201);
    }

    public function show(string $id)
    {
        return response()->json(Felhasznalo::findOrFail($id));
    }

    
}