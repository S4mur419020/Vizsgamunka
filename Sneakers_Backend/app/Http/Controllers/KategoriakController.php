<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorekategoriakRequest;
use App\Http\Requests\UpdatekategoriakRequest;
use App\Models\kategoriak;
use Illuminate\Http\Request;

class KategoriakController extends Controller
{
    public function index()
    {
        return response()->json(Kategoriak::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string'
        ]);

        return response()->json(Kategoriak::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Kategoriak::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $kategoria = Kategoriak::findOrFail($id);
        $kategoria->update($request->all());
        return response()->json($kategoria);
    }

    public function destroy($id)
    {
        Kategoriak::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
    
}
