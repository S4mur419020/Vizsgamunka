<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\Felhasznalo;
use App\Mail\WelcomeMail;

class RegisztracioController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email|max:50|unique:felhasznalos,email',
            'password' => 'required|min:6'
        ]);

        $felhasznalo = Felhasznalo::create([
            'nev' => $validated['name'],
            'email' => $validated['email'],
            'jelszo' => Hash::make($validated['password']),
            'telefonszam' => '060000000',
            'regisztracio_datuma' => now(),
            'aktiv' => true,
            'nyelv_id' => 1,
            'szekhely_id' => 1,
        ]);

        try {
            Mail::to($felhasznalo->email)->send(new WelcomeMail($felhasznalo));
        } catch (\Exception $e) {
            Log::error("Email küldési hiba: " . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'user' => $felhasznalo
        ], 201);
    }
}
