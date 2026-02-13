<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRendeles_tetelRequest;
use App\Http\Requests\UpdateRendeles_tetelRequest;
use App\Models\Rendeles_tetel;
use Illuminate\Http\Request;

class RendelesTetelController extends Controller
{
    public function index()
    {
        return response()->json(Rendeles_Tetel::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rendeles_id' => 'required|exists:rendeles,id',
            'termek_id' => 'required|exists:termek,id',
            'mennyiseg' => 'required|integer|min:1',
            'ar' => 'required|numeric'
        ]);

        return response()->json(Rendeles_Tetel::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Rendeles_Tetel::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $tetel = Rendeles_Tetel::findOrFail($id);
        $tetel->update($request->all());
        return response()->json($tetel);
    }

    public function destroy($id)
    {
        Rendeles_Tetel::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
