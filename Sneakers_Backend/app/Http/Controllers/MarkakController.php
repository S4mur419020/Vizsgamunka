<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoremarkakRequest;
use App\Http\Requests\UpdatemarkakRequest;
use App\Models\markak;
use Illuminate\Http\Request;

class MarkakController extends Controller
{
    public function index()
    {
        return response()->json(Markak::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string'
        ]);

        return response()->json(Markak::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Markak::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $marka = Markak::findOrFail($id);
        $marka->update($request->all());
        return response()->json($marka);
    }

    public function destroy($id)
    {
        Markak::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
