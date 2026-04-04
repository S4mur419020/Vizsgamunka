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
        // A React-ból 'kod', 'szazalek' és 'lejarat' érkezik.
        $validated = $request->validate([
            'kod' => 'required|string|unique:learazas,kod',
            'szazalek' => 'required|numeric|min:0|max:100',
            'lejarat' => 'nullable|string'
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
            'kod' => 'string|unique:learazas,kod,' . $id,
            'szazalek' => 'numeric|min:0|max:100',
            'lejarat' => 'nullable|string'
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