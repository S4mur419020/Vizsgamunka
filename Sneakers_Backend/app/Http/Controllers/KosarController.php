<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKosarRequest;
use App\Http\Requests\UpdateKosarRequest;
use App\Models\Kosar;
use Illuminate\Http\Request;

class KosarController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user() ? $request->user()->felhasznalo_id : $request->query('felhasznalo_id');
        
        if (!$userId) return response()->json([]);

        return response()->json(
            Kosar::where('felhasznalo_id', $userId)->with(['termek'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'felhasznalo_id' => 'required',
            'termek_id'      => 'required',
            'meret_id'       => 'required',
            'mennyiseg'      => 'required|integer|min:1',
        ]);

        $validated['hozzaadas_datum'] = now();


        return response()->json(Kosar::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Kosar::with('termek')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $kosar = Kosar::findOrFail($id);
        $kosar->update($request->all());
        return response()->json($kosar);
    }

    public function destroy($id)
    {
        Kosar::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}
