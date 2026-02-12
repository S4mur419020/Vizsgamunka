<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTelephelyRequest;
use App\Http\Requests\UpdateTelephelyRequest;
use App\Models\Telephely;
use Illuminate\Http\Request;

class TelephelyController extends Controller
{
    public function index()
    {
        return response()->json(Telephely::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'szekhely_id' => 'required|exists:szekhely,id',
            'nev' => 'required|string',
            'cim' => 'required|string'
        ]);

        return response()->json(Telephely::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Telephely::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $telephely = Telephely::findOrFail($id);
        $telephely->update($request->all());
        return response()->json($telephely);
    }

    public function destroy($id)
    {
        Telephely::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}