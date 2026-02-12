<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKosarRequest;
use App\Http\Requests\UpdateKosarRequest;
use App\Models\Kosar;
use Illuminate\Http\Request;

class KosarController extends Controller
{
    public function index()
    {
        return response()->json(Kosar::with(['termek','felhasznalo'])->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'felhasznalo_id' => 'required|exists:users,id',
            'termek_id' => 'required|exists:termek,id',
            'mennyiseg' => 'required|integer|min:1'
        ]);

        return response()->json(Kosar::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Kosar::with('termek')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $kosar = Kosar::findOrFail($id);
        $kosar->update($request->all());
        return response()->json($kosar);
    }

    public function destroy($id)
    {
        Kosar::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
