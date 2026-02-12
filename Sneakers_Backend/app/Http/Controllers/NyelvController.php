<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNyelvRequest;
use App\Http\Requests\UpdateNyelvRequest;
use App\Models\Nyelv;
use Illuminate\Http\Request;

class NyelvController extends Controller
{
    public function index()
    {
        return response()->json(Nyelv::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kod' => 'required|string',
            'megnevezes' => 'required|string'
        ]);

        return response()->json(Nyelv::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Nyelv::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $nyelv = Nyelv::findOrFail($id);
        $nyelv->update($request->all());
        return response()->json($nyelv);
    }

    public function destroy($id)
    {
        Nyelv::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}