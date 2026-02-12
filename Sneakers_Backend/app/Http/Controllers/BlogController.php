<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(Blog::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cim' => 'required|string',
            'tartalom' => 'required|string'
        ]);

        return response()->json(Blog::create($validated), 201);
    }

    public function show($id)
    {
        return response()->json(Blog::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->update($request->all());
        return response()->json($blog);
    }

    public function destroy($id)
    {
        Blog::destroy($id);
        return response()->json(['message' => 'Törölve']);
    }
}