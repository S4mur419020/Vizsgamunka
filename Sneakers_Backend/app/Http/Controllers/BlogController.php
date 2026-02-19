<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class BlogController extends Controller
{
    public function index()
    {

        $user = Auth::user();

        if ($user && $user->jogosultsag_id === 1) {
            return response()->json(Blog::all());
        }

        return response()->json(['message' => 'Nincs jogosultságod a megtekintéshez'], 403);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cim' => 'required|string|max:50',
            'tartalom' => 'required|string'
        ]);

        $blog = Blog::create([
            'cim' => $validated['cim'],
            'tartalom' => $validated['tartalom'],
            'szerzo_id' => Auth::id() ?? 1,
            'nyelv_id' => 1,
            'publikacio_datuma' => now()
        ]);

        return response()->json($blog, 201);
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
