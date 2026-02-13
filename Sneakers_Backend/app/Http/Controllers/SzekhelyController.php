<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSzekhelyRequest;
use App\Http\Requests\UpdateSzekhelyRequest;
use App\Models\Szekhely;
use Illuminate\Http\Request;

class SzekhelyController extends Controller
{
    public function index()
    {
        return response()->json(Szekhely::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string',
            'cim' => 'required|string'
        ]);

        return response()->json(Szekhely::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Szekhely::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $szekhely = Szekhely::findOrFail($id);
        $szekhely->update($request->all());
        return response()->json($szekhely);
    }

    public function destroy($id)
    {
        Szekhely::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
