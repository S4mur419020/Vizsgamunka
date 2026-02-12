<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKeszletRequest;
use App\Http\Requests\UpdateKeszletRequest;
use App\Models\Keszlet;
use Illuminate\Http\Request;

class KeszletController extends Controller
{
    public function index()
    {
        return response()->json(Keszlet::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'termek_id' => 'required|exists:termek,id',
            'mennyiseg' => 'required|integer'
        ]);

        return response()->json(Keszlet::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Keszlet::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $keszlet = Keszlet::findOrFail($id);
        $keszlet->update($request->all());
        return response()->json($keszlet);
    }

    public function destroy($id)
    {
        Keszlet::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}
