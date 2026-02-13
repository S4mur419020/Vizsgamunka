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
        return response()->json(Szallitasi_Cim::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'felhasznalo_id' => 'required|exists:users,id',
            'cim' => 'required|string',
            'varos' => 'required|string',
            'iranyitoszam' => 'required|string'
        ]);

        return response()->json(Szallitasi_Cim::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Szallitasi_Cim::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $cim = Szallitasi_Cim::findOrFail($id);
        $cim->update($request->all());
        return response()->json($cim);
    }

    public function destroy($id)
    {
        Szallitasi_Cim::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
