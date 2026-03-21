<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use App\Models\Rendeles_tetel;
use App\Models\Kosar;
use App\Models\Felhasznalo;
use App\Mail\OrderConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

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

        $rendelesData = DB::transaction(function () use ($validated, $request) {

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

            $emailTetelek = [];


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

            $emailTetelek[] = [
                'nev' => $item->termek->nev,
                'mennyiseg' => $item->mennyiseg,
                'ar' => $item->termek->ar
            ];


            Kosar::where('felhasznalo_id', $validated['felhasznalo_id'])->delete();

            return [
                'rendeles' => $rendeles,
                'tetelek' => $emailTetelek
            ];
        });

        try {
            $felhasznalo = \App\Models\Felhasznalo::find($validated['felhasznalo_id']);

            if ($felhasznalo && $felhasznalo->email) {
                Mail::to($felhasznalo->email)->send(
                    new OrderConfirmationMail($rendelesData['rendeles'], $rendelesData['tetelek'])
                );
            } else {
                Log::error("E-mail küldés sikertelen: nem található felhasználó ezzel az ID-val: " . $validated['felhasznalo_id']);
            }
        } catch (\Exception $e) {
            Log::error("Vásárlási e-mail hiba: " . $e->getMessage());
        }

        return response()->json($rendelesData['rendeles'], 201);
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
