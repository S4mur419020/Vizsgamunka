<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegioRequest;
use App\Http\Requests\UpdateRegioRequest;
use App\Models\Regio;
use Illuminate\Http\Request;

class RegioController extends Controller
{
    public function index()
    {
        return response()->json(Regio::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string'
        ]);

        return response()->json(Regio::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Regio::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $regio = Regio::findOrFail($id);
        $regio->update($request->all());
        return response()->json($regio);
    }

    public function destroy($id)
    {
        Regio::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}