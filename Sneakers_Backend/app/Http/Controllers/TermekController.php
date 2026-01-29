<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoretermekekRequest;
use App\Http\Requests\UpdatetermekekRequest;;
use App\Models\Termekek;
use Illuminate\Http\Request;

class TermekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Termekek::with(['marka', 'kategoria', 'valtozatok']);

        if ($request->marka_id) {
            $query->where('marka_id', $request->marka_id);
        }

        if ($request->kategoria_id) {
            $query->where('kategoria_id', $request->kategoria_id);
        }

        if ($request->elerheto) {
            $query->where('elerheto', true);
        }

        return response()->json($query->get());
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoretermekekRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Termekek $termek)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Termekek $termek)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatetermekekRequest $request, Termekek $termek)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Termekek $termek)
    {
        //
    }
}
