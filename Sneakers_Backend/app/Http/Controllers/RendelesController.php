<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Models\Rendeles_tetel; 
use App\Models\Kosar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RendelesController extends Controller
{
    public function index()
    {
        return response()->json(
            Rendeles::with(['tetel.termek', 'felhasznalo'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'felhasznalo_id' => 'required',
            'ar'             => 'required|numeric',
            'szallitasi_cim' => 'required|string',
        ]);

        return DB::transaction(function () use ($validated) {
           
            $rendeles = Rendeles::create([
                'felhasznalo_id'    => $validated['felhasznalo_id'],
                'osszeg'            => $validated['ar'],
                'allapot'           => 'feldolgozás alatt',
                'datum'             => now(),
                'fizetes_id'        => $request->fizetes_id ?? null,
                'szallitasi_cim_id' => $request->szallitasi_cim_id ?? null
            ]);
            $kosarTetelek = Kosar::with('termek')
                ->where('felhasznalo_id', $validated['felhasznalo_id'])
                ->get();

            
            foreach ($kosarTetelek as $item) {
                Rendeles_tetel::create([
                    'rendeles_id'  => $rendeles->rendeles_id,
                    'termek_id'    => $item->termek_id,
                    'meret_id'     => $item->meret_id,
                    'mennyiseg'    => $item->mennyiseg,
                    'egyseg_ar'    => $item->termek->ar,
                    'fizetes_id'   => 1, 
                    'telephely_id' => 1, 
                ]);
            }

            
            Kosar::where('felhasznalo_id', $validated['felhasznalo_id'])->delete();

            return response()->json($rendeles, 201);
        });
    }

    public function show($id)
    {
        return response()->json(
            Rendeles::with('tetel')->findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $rendeles = Rendeles::findOrFail($id);
        $rendeles->update($request->all());
        return response()->json($rendeles);
    }

    public function destroy($id)
    {
        Rendeles::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}
