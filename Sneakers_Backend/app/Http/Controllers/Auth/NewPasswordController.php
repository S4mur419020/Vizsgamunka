<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use App\Models\Felhasznalo;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request): View
    {
        return view('auth.reset-password', ['request' => $request]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', 'min:6'],
        ]);
        $user = Felhasznalo::where('email', $request->email)->first();
        if (!$user || !Password::getRepository()->exists($user, $request->token)) {
            return response()->json(['message' => 'Érvénytelen token vagy email.'], 400);
        }
        $user->jelszo = Hash::make($request->password);
        $user->save();
        Password::getRepository()->delete($user);
        event(new PasswordReset($user));
        return response()->json([
            'status' => 'success',
            'message' => 'A jelszavadat sikeresen megváltoztattuk!'
        ], 200);
    }
}
