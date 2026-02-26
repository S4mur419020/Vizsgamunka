<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Felhasznalo;

class RegisztracioController extends Controller
{
    public function store(Request $request)
    {
        try {
            
            $validated = $request->validate([
                'name' => 'required|string|max:50',
                'email' => 'required|email|max:50|unique:felhasznalos,email',
                'password' => 'required|min:6'
            ]);

            
            $felhasznalo = Felhasznalo::create([
                'nev' => $validated['name'],
                'email' => $validated['email'],
               
                'jelszo' => $validated['password'], 
                'telefonszam' => '060000000', 
                'regisztracio_datuma' => now(),
                'aktiv' => true,
                'nyelv_id' => 1,    
                'szekhely_id' => 1, 
            ]);

            return response()->json([
                'success' => true,
                'user' => $felhasznalo
            ], 201);

        } catch (\Exception $e) {
            
            return response()->json(['message' => 'Hiba: ' . $e->getMessage()], 500);
        }
    }
}