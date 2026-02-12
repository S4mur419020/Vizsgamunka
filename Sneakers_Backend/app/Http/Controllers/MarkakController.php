<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoremarkakRequest;
use App\Http\Requests\UpdatemarkakRequest;
use App\Models\markak;

class MarkakController extends Controller
{
    public function index()
    {
        return response()->json(Marka::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string'
        ]);

        return response()->json(Marka::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Marka::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $marka = Marka::findOrFail($id);
        $marka->update($request->all());
        return response()->json($marka);
    }

    public function destroy($id)
    {
        Marka::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
