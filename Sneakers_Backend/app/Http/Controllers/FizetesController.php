<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFizetesRequest;
use App\Http\Requests\UpdateFizetesRequest;
use App\Models\Fizetes;

class FizetesController extends Controller
{
    public function index()
    {
        return response()->json(Fizetes::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rendeles_id' => 'required|exists:rendeles,id',
            'osszeg' => 'required|numeric',
            'mod' => 'required|string'
        ]);

        return response()->json(Fizetes::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Fizetes::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $fizetes = Fizetes::findOrFail($id);
        $fizetes->update($request->all());
        return response()->json($fizetes);
    }

    public function destroy($id)
    {
        Fizetes::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}
