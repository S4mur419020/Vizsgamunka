<?php

namespace App\Http\Controllers;

use App\Models\Rendeles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RendelesController extends Controller
{
    public function index()
    {
        return response()->json(
            Rendeles::with(['rendelesTetelek','felhasznalo'])->get()
        );
    }

    public function store(Request $request)
    {
        return DB::transaction(function () use ($request) {

            $validated = $request->validate([
                'felhasznalo_id' => 'required|exists:users,id',
                'statusz' => 'required|string'
            ]);

            $rendeles = Rendeles::create($validated);

            if ($request->has('tetelek')) {
                foreach ($request->tetelek as $tetel) {
                    $rendeles->rendelesTetelek()->create($tetel);
                }
            }

            return response()->json($rendeles, 201);
        });
    }

    public function show($id)
    {
        return response()->json(
            Rendeles::with('rendelesTetelek')->findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $rendeles = Rendeles::findOrFail($id);
        $rendeles->update($request->all());
        return response()->json($rendeles);
    }

    public function destroy($id)
    {
        Rendeles::destroy($id);
        return response()->json(['message'=>'Törölve']);
    }
}
