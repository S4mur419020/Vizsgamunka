<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorekategoriakRequest;
use App\Http\Requests\UpdatekategoriakRequest;
use App\Models\kategoriak;

class KategoriakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return response()->json(Kategoriak::withCount('termekek')->get());
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
    public function store(StorekategoriakRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(kategoriak $kategoriak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(kategoriak $kategoriak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatekategoriakRequest $request, kategoriak $kategoriak)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(kategoriak $kategoriak)
    {
        //
    }
}
