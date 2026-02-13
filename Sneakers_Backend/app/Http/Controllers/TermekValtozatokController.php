<?php

namespace App\Http\Controllers;

use App\Http\Requests\Storetermek_valtozatokRequest;
use App\Http\Requests\Updatetermek_valtozatokRequest;
use App\Models\termek_valtozatok;
use Illuminate\Http\Request;


class TermekValtozatokController extends Controller
{
    public function index()
    {
        return response()->json(termek_valtozatok::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'termek_id' => 'required|exists:termek,id',
            'meret_id' => 'required|exists:meret,id',
            'szin' => 'required|string',
            'keszlet' => 'required|integer'
        ]);

        return response()->json(termek_valtozatok::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Termek_Valtozatok::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $valtozat = termek_valtozatok::findOrFail($id);
        $valtozat->update($request->all());
        return response()->json($valtozat);
    }

    public function destroy($id)
    {
        termek_valtozatok::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
