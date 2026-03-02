<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KategoriakController;
use App\Http\Controllers\MarkakController;
use App\Http\Controllers\TermekController;
use App\Http\Controllers\TermekValtozatokController;
use App\Http\Controllers\KosarController;
use App\Http\Controllers\RendelesController;
use App\Http\Controllers\RendelesTetelController;
use App\Http\Controllers\FizetesController;
use App\Http\Controllers\KeszletController;
use App\Http\Controllers\MeretController;
use App\Http\Controllers\LearazasController;
use App\Http\Controllers\RegioController;
use App\Http\Controllers\NyelvController;
use App\Http\Controllers\SzallitasiCimController;
use App\Http\Controllers\SzekhelyController;
use App\Http\Controllers\TelephelyController;
use App\Http\Controllers\ArController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\FelhasznaloController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisztracioController;
use Illuminate\Http\Request;


Route::get('/user', function (Request $request) {
    
    return response()->json(auth()->user());
});

Route::prefix('kategoriak')->group(function () {
    Route::get('/', [KategoriakController::class, 'index']);
    Route::get('{id}', [KategoriakController::class, 'show']);
    Route::post('/', [KategoriakController::class, 'store']);
    Route::put('{id}', [KategoriakController::class, 'update']);
    Route::delete('{id}', [KategoriakController::class, 'destroy']);
});

Route::prefix('markak')->group(function () {
    Route::get('/', [MarkakController::class, 'index']);
    Route::get('{id}', [MarkakController::class, 'show']);
    Route::post('/', [MarkakController::class, 'store']);
    Route::put('{id}', [MarkakController::class, 'update']);
    Route::delete('{id}', [MarkakController::class, 'destroy']);
});

Route::prefix('termekek')->group(function () {
    Route::get('/', [TermekController::class, 'index']);
    Route::get('{id}', [TermekController::class, 'show']);
    Route::post('/', [TermekController::class, 'store']);
    Route::put('{id}', [TermekController::class, 'update']);
    Route::delete('{id}', [TermekController::class, 'destroy']);
});

Route::prefix('termek_valtozatok')->group(function () {
    Route::get('/', [TermekValtozatokController::class, 'index']);
    Route::get('{id}', [TermekValtozatokController::class, 'show']);
    Route::post('/', [TermekValtozatokController::class, 'store']);
    Route::put('{id}', [TermekValtozatokController::class, 'update']);
    Route::delete('{id}', [TermekValtozatokController::class, 'destroy']);
});

Route::prefix('kosar')->group(function () {
    Route::get('/', [KosarController::class, 'index']);
    Route::get('{id}', [KosarController::class, 'show']);
    Route::post('/', [KosarController::class, 'store']);
    Route::put('{id}', [KosarController::class, 'update']);
    Route::delete('{id}', [KosarController::class, 'destroy']);
});

Route::prefix('rendelesek')->group(function () {
    Route::get('/', [RendelesController::class, 'index']);
    Route::get('{id}', [RendelesController::class, 'show']);
    Route::post('/', [RendelesController::class, 'store']);
    Route::put('{id}', [RendelesController::class, 'update']);
    Route::delete('{id}', [RendelesController::class, 'destroy']);
});

Route::prefix('rendeles_tetelek')->group(function () {
    Route::get('/', [RendelesTetelController::class, 'index']);
    Route::get('{id}', [RendelesTetelController::class, 'show']);
    Route::post('/', [RendelesTetelController::class, 'store']);
    Route::put('{id}', [RendelesTetelController::class, 'update']);
    Route::delete('{id}', [RendelesTetelController::class, 'destroy']);
});

Route::prefix('fizetesek')->group(function () {
    Route::get('/', [FizetesController::class, 'index']);
    Route::get('{id}', [FizetesController::class, 'show']);
    Route::post('/', [FizetesController::class, 'store']);
    Route::put('{id}', [FizetesController::class, 'update']);
    Route::delete('{id}', [FizetesController::class, 'destroy']);
});

Route::prefix('felhasznalok')->group(function () {
    Route::get('/', [FelhasznaloController::class, 'index']);
    Route::get('{id}', [FelhasznaloController::class, 'show']);
    Route::post('/', [FelhasznaloController::class, 'store']);
    Route::put('{id}', [FelhasznaloController::class, 'update']);
    Route::delete('{id}', [FelhasznaloController::class, 'destroy']);
});

Route::prefix('keszlet')->group(function () {
    Route::get('/', [KeszletController::class, 'index']);
    Route::get('{termek_id}', [KeszletController::class, 'show']);
    Route::post('/', [KeszletController::class, 'store']);
    Route::put('{termek_id}', [KeszletController::class, 'update']);
});

Route::prefix('arak')->group(function () {
    Route::get('/', [ArController::class, 'index']);
    Route::get('{termek_id}', [ArController::class, 'show']);
    Route::post('/', [ArController::class, 'store']);
    Route::put('{termek_id}', [ArController::class, 'update']);
});

Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'index']);
    Route::get('{id}', [BlogController::class, 'show']);
    Route::post('/', [BlogController::class, 'store']);
    Route::put('{id}', [BlogController::class, 'update']);
    Route::delete('{id}', [BlogController::class, 'destroy']);
});


Route::post('/login', [FelhasznaloController::class, 'login']);
Route::post('/logout', [FelhasznaloController::class, 'logout']);


Route::get('/user', function (Illuminate\Http\Request $request) {
    return response()->json(auth()->user() ?: ['message' => 'Nincs bejelentkezve']);
});

Route::prefix('regisztracio')->group(function () {
    Route::post('/', [RegisztracioController::class, 'store']);
    Route::post('aktivacio', [RegisztracioController::class, 'aktivacio']);
});

Route::prefix('profile')->group(function () {
    Route::get('/', [ProfileController::class, 'index']);
    Route::get('{id}', [ProfileController::class, 'show']);
    Route::post('/', [ProfileController::class, 'store']);
    Route::put('{id}', [ProfileController::class, 'update']);
    Route::delete('{id}', [ProfileController::class, 'destroy']);
    Route::put('jelszo/{id}', [ProfileController::class, 'updatePassword']);
});

Route::prefix('szallitasi_cimek')->group(function () {
    Route::get('/', [SzallitasiCimController::class, 'index']);
    Route::get('{id}', [SzallitasiCimController::class, 'show']);
    Route::post('/', [SzallitasiCimController::class, 'store']);
    Route::put('{id}', [SzallitasiCimController::class, 'update']);
    Route::delete('{id}', [SzallitasiCimController::class, 'destroy']);
});

Route::prefix('telephelyek')->group(function () {
    Route::get('/', [TelephelyController::class, 'index']);
    Route::get('{id}', [TelephelyController::class, 'show']);
    Route::post('/', [TelephelyController::class, 'store']);
    Route::put('{id}', [TelephelyController::class, 'update']);
    Route::delete('{id}', [TelephelyController::class, 'destroy']);
});

Route::prefix('meretek')->group(function () {
    Route::get('/', [MeretController::class, 'index']);
    Route::get('{id}', [MeretController::class, 'show']);
    Route::post('/', [MeretController::class, 'store']);
    Route::put('{id}', [MeretController::class, 'update']);
    Route::delete('{id}', [MeretController::class, 'destroy']);
});

Route::prefix('nyelvek')->group(function () {
    Route::get('/', [NyelvController::class, 'index']);
    Route::get('{id}', [NyelvController::class, 'show']);
    Route::post('/', [NyelvController::class, 'store']);
    Route::put('{id}', [NyelvController::class, 'update']);
    Route::delete('{id}', [NyelvController::class, 'destroy']);
});
