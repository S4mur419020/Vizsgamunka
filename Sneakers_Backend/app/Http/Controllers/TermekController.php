<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoretermekekRequest;
use App\Http\Requests\UpdatetermekekRequest;;

use Illuminate\Support\Facades\Storage;
use App\Models\Termekek;
use Illuminate\Http\Request;

class TermekController extends Controller
{
    public function index()
    {
        $termekek = Termekek::with(['kategoria', 'marka', 'valtozatok'])->get();

        $termekek->map(function ($termek) {
            if ($termek->kep) {
                $termek->kep = asset('storage/'. $termek->kep);
            }
            return $termek;
        });

        return response()->json($termekek);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nev' => 'required|string',
            'ar' => 'required|numeric',
            'kategoria_id' => 'required|exists:kategoria,id',
            'kep' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('kep')) {
            $path = $request->file('kep')->store('termekek', 'public');
            $validated['kep'] = $path;
        }

        $termek = Termekek::create($validated);

        return response()->json($termek, 201);
    }

    public function show($id)
    {
        return response()->json(Termekek::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $termek = Termekek::findOrFail($id);

        $validated = $request->validate([
            'nev' => 'sometimes|string',
            'ar' => 'sometimes|numeric',
            'kategoria_id' => 'sometimes|exists:kategoriak,id',
            'kep' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('kep')) {
            if ($termek->kep) {
                Storage::disk('public')->delete($termek->kep);
            }

            $path = $request->file('kep')->store('termekek', 'public');
            $validated['kep'] = $path;
        }


        $termek->update($validated);
        return response()->json($termek);
    }

    public function destroy($id)
    {
        Termekek::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}
