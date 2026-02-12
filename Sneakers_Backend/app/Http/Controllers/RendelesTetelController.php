<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRendeles_tetelRequest;
use App\Http\Requests\UpdateRendeles_tetelRequest;
use App\Models\Rendeles_tetel;

class RendelesTetelController extends Controller
{
    public function index()
    {
        return response()->json(RendelesTetel::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rendeles_id' => 'required|exists:rendeles,id',
            'termek_id' => 'required|exists:termek,id',
            'mennyiseg' => 'required|integer|min:1',
            'ar' => 'required|numeric'
        ]);

        return response()->json(RendelesTetel::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(RendelesTetel::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $tetel = RendelesTetel::findOrFail($id);
        $tetel->update($request->all());
        return response()->json($tetel);
    }

    public function destroy($id)
    {
        RendelesTetel::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
