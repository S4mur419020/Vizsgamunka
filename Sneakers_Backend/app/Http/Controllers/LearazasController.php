<?php

namespace App\Http\Controllers;

use App\Models\Learazas;
use Illuminate\Http\Request;

class LearazasController extends Controller
{
    public function index()
    {
        return response()->json(Learazas::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marka' => 'required|string|max:50',
            'tipus' => 'required|string|max:50',
            'akcio_szazalek' => 'required|numeric|min:0|max:100',
            'kezdo_datum' => 'required|date',
            'zaro_datum' => 'required|date',
            'aktiv' => 'nullable|boolean'
        ]);

        $learazas = Learazas::create($validated);

        return response()->json($learazas, 201);
    }

    public function show($id)
    {
        return response()->json(Learazas::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $learazas = Learazas::findOrFail($id);
        $validated = $request->validate([
            'marka' => 'string|max:50',
            'tipus' => 'string|max:50',
            'akcio_szazalek' => 'numeric|min:0|max:100',
            'kezdo_datum' => 'date',
            'zaro_datum' => 'date',
            'aktiv' => 'boolean'
        ]);

        $learazas->update($validated);
        
        return response()->json($learazas);
    }

    public function destroy($id)
    {
        Learazas::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}