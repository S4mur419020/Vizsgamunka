<?php

namespace App\Http\Controllers;

use App\Models\Felhasznalo;
use Illuminate\Http\Request;
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
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
                $user = Auth::user();
                return response()->json([
                    'success' => true,
                    'user' => [
                        'felhasznalo_id' => $user->felhasznalo_id,
                        'nev' => $user->nev,
                        'email' => $user->email,
                        'role_id' => $user->role_id,
                    ],
                    'message' => 'Sikeres bejelentkezés!'
                ], 200);
            }

            return response()->json(['success' => false, 'message' => 'Hibás adatok!'], 401);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['success' => true]);
    }

    public function updateRole(Request $request, $id)
    {
        $user = Felhasznalo::findOrFail($id);
        $user->role_id = ($request->jogosultsag === 'admin') ? 1 : 2;
        
        $user->save();

        return response()->json(['message' => 'Sikeres módosítás']);
    }

    public function destroy($id)
    {
        try {
            $user = Felhasznalo::findOrFail($id);
            if (method_exists($user, 'kosar')) {
                $user->kosar()->delete();
            }

            $user->delete();

            return response()->json(['message' => 'Felhasználó törölve']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Hiba történt a törlés során!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function currentUser(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Nincs bejelentkezve'], 401);
        $roleName = ((int)$user->role_id === 1) ? 'admin' : 'felhasznalo';

        return response()->json([
            'id' => $user->felhasznalo_id,
            'name' => $user->nev,
            'email' => $user->email,
            'role_id' => $user->role_id,
            'role' => $roleName,
        ]);
    }
}