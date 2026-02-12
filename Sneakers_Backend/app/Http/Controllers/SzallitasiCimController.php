<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSzallitasi_cimRequest;
use App\Http\Requests\UpdateSzallitasi_cimRequest;
use App\Models\Szallitasi_cim;
use Illuminate\Http\Request;

class SzallitasiCimController extends Controller
{
    public function index()
    {
        return response()->json(SzallitasiCim::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'felhasznalo_id' => 'required|exists:users,id',
            'cim' => 'required|string',
            'varos' => 'required|string',
            'iranyitoszam' => 'required|string'
        ]);

        return response()->json(SzallitasiCim::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(SzallitasiCim::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $cim = SzallitasiCim::findOrFail($id);
        $cim->update($request->all());
        return response()->json($cim);
    }

    public function destroy($id)
    {
        SzallitasiCim::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
