<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLearazasRequest;
use App\Http\Requests\UpdateLearazasRequest;
use App\Models\Learazas;
use Illuminate\Http\Request;

class LearazasController extends Controller
{
    public function index()
    {
        return response()->json(Learazas::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'termek_id' => 'required|exists:termek,id',
            'szazalek' => 'required|numeric|min:0|max:100'
        ]);

        return response()->json(Learazas::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Learazas::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $learazas = Learazas::findOrFail($id);
        $learazas->update($request->all());
        return response()->json($learazas);
    }

    public function destroy($id)
    {
        Learazas::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
