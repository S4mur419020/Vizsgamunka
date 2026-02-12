<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorearRequest;
use App\Http\Requests\UpdatearRequest;
use App\Models\ar;
use Illuminate\Http\Request;

class ArController extends Controller
{
    public function index()
    {
        return response()->json(Ar::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'termek_id' => 'required|exists:termek,id',
            'osszeg' => 'required|numeric'
        ]);

        return response()->json(Ar::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Ar::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $ar = Ar::findOrFail($id);
        $ar->update($request->all());
        return response()->json($ar);
    }

    public function destroy($id)
    {
        Ar::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}