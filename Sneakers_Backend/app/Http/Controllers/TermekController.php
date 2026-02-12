<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoretermekekRequest;
use App\Http\Requests\UpdatetermekekRequest;;
use App\Models\Termekek;
use Illuminate\Http\Request;

class TermekController extends Controller
{
    public function index()
    {
        return response()->json(
            Termek::with(['kategoria','marka','keszlet'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string',
            'ar' => 'required|numeric',
            'kategoria_id' => 'required|exists:kategoria,id'
        ]);

        return response()->json(Termek::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Termek::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $termek = Termek::findOrFail($id);
        $termek->update($request->all());
        return response()->json($termek);
    }

    public function destroy($id)
    {
        Termek::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}