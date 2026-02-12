<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeretRequest;
use App\Http\Requests\UpdateMeretRequest;
use App\Models\Meret;
use Illuminate\Http\Request;

class MeretController extends Controller
{
    public function index()
    {
        return response()->json(Meret::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string'
        ]);

        return response()->json(Meret::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Meret::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $meret = Meret::findOrFail($id);
        $meret->update($request->all());
        return response()->json($meret);
    }

    public function destroy($id)
    {
        Meret::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
