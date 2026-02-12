<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorekategoriakRequest;
use App\Http\Requests\UpdatekategoriakRequest;
use App\Models\kategoriak;

class KategoriakController extends Controller
{
    public function index()
    {
        return response()->json(Kategoria::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string'
        ]);

        return response()->json(Kategoria::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Kategoria::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $kategoria = Kategoria::findOrFail($id);
        $kategoria->update($request->all());
        return response()->json($kategoria);
    }

    public function destroy($id)
    {
        Kategoria::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}
