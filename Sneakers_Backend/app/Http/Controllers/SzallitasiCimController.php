<?php

namespace App\Http\Controllers;

use App\Models\Szallitasi_cim;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SzallitasiCimController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json(Szallitasi_cim::all());
        }

        return response()->json(Szallitasi_cim::where('felhasznalo_id', $userId)->get());
    }

    public function store(Request $request)
    {

        $userId = Auth::id() ?? $request->felhasznalo_id;

        if (!$userId) {
            return response()->json([
                'message' => 'Hitelesítési hiba: A szerver nem azonosította a felhasználót.',
                'auth_check' => Auth::check(),
            ], 401);
        }

        $validated = $request->validate([
            'orszag'       => 'required|string|max:50',
            'iranyitoszam' => 'required|string|max:10',
            'varos'        => 'required|string|max:50',
            'utca_szam'    => 'required|string|max:100',
            'ceg'          => 'nullable|string',
            'telefonszam'  => 'nullable|string',
            'megjegyzes'   => 'nullable|string',
        ]);

        $cim = Szallitasi_cim::create([
            'felhasznalo_id' => $userId,
            'orszag'         => $validated['orszag'],
            'iranyitoszam'   => $validated['iranyitoszam'],
            'varos'          => $validated['varos'],
            'utca_szam'      => $validated['utca_szam'],
            'ceg'            => $request->ceg,
            'telefonszam'    => $request->telefonszam,
            'megjegyzes'     => $request->megjegyzes,
        ]);

        return response()->json($cim, 201);
    }

    public function update(Request $request, $id)
    {

        $cim = Szallitasi_cim::where('szallitasi_cim_id', $id)
            ->where('felhasznalo_id', $request->user()->id)
            ->firstOrFail();


        $validated = $request->validate([
            'firstName'    => 'sometimes|string|max:50',
            'lastName'     => 'sometimes|string|max:50',
            'orszag'       => 'sometimes|string|max:50',
            'iranyitoszam' => 'sometimes|string|max:10',
            'varos'        => 'sometimes|string|max:50',
            'utca_szam'    => 'required|string|max:100',
            'ceg'          => 'nullable|string|max:100',
            'telefonszam'  => 'nullable|string|max:20',
            'megjegyzes'   => 'nullable|string',
        ]);


        $cim->update([
            'orszag'       => $validated['orszag'] ?? $cim->orszag,
            'iranyitoszam' => $validated['iranyitoszam'] ?? $cim->iranyitoszam,
            'varos'        => $validated['varos'] ?? $cim->varos,
            'utca_szam'    => $validated['utca_szam'] ?? $cim->utca_szam,
            'ceg'          => $validated['ceg'] ?? $cim->ceg,
            'telefonszam'  => $validated['telefonszam'] ?? $cim->telefonszam,
            'megjegyzes'   => $validated['megjegyzes'] ?? $cim->megjegyzes,
        ]);

        return response()->json($cim);
    }

    public function show($id)
    {
        return response()->json(Szallitasi_cim::where('felhasznalo_id', Auth::id())->findOrFail($id));
    }

    public function destroy($id)
    {
        $cim = Szallitasi_cim::where('szallitasi_cim_id', $id)
            ->where('felhasznalo_id', Auth::id())
            ->firstOrFail();

        $cim->delete();
        return response()->json(['message' => 'Törölve']);
    }
}
