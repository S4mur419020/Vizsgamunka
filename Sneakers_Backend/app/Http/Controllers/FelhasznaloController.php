<?php

namespace App\Http\Controllers;

use App\Models\Felhasznalo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FelhasznaloController extends Controller
{
    public function index()
    {
        $felhasznalok = Felhasznalo::all();
        return response()->json($felhasznalok);
    }

    // --- LOGIN FÜGGVÉNY ---
    public function login(Request $request)
    {
        try {
            // Megkeressük a felhasználót az email alapján
            $user = Felhasznalo::where('email', $request->email)->first();

            // Ellenőrizzük a jelszót (az adatbázisban 'jelszo' a mező neve!)
            if (!$user || !Hash::check($request->password, $user->jelszo)) {
                return response()->json(['message' => 'Hibás e-mail cím vagy jelszó!'], 401);
            }

            return response()->json([
                'user' => $user,
                'token' => 'dummy-token-auth', // Ideiglenes token
                'success' => true
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Szerver hiba történt!'], 500);
        }
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
        $felhasznalo = Felhasznalo::findOrFail($id);
        return response()->json($felhasznalo);
    }

    public function update(Request $request, string $id)
    {
        $felhasznalo = Felhasznalo::findOrFail($id);

        $validated = $request->validate([
            'nev' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:felhasznalok,email,' . $id,
            'jelszo' => 'sometimes|string|min:6',
        ]);
        
        if (isset($validated['jelszo'])) {
            $validated['jelszo'] = Hash::make($validated['jelszo']);
        }

        $felhasznalo->update($validated);
        return response()->json($felhasznalo);
    }

    public function destroy(string $id)
    {
        $felhasznalo = Felhasznalo::findOrFail($id);
        $felhasznalo->delete();
        return response()->json(['message' => 'Felhasználó törölve.']);
    }
}