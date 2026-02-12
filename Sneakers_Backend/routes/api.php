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
use Illuminate\Http\Request;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

->prefix('kategoriak')
->group(function () {
    Route::get('/', [KategoriakController::class, 'index']);
    Route::get('{id}', [KategoriakController::class, 'show']);
    Route::post('/', [KategoriakController::class, 'store']);
    Route::put('{id}', [KategoriakController::class, 'update']);
    Route::delete('{id}', [KategoriakController::class, 'destroy']);
});

->prefix('markak')
->group(function () {
    Route::get('/', [MarkakController::class, 'index']);
    Route::get('{id}', [MarkakController::class, 'show']);
    Route::post('/', [MarkakController::class, 'store']);
    Route::put('{id}', [MarkakController::class, 'update']);
    Route::delete('{id}', [MarkakController::class, 'destroy']);
});

->prefix('termekek')
->group(function () {
    Route::get('/', [TermekController::class, 'index']);
    Route::get('{id}', [TermekController::class, 'show']);
    Route::post('/', [TermekController::class, 'store']);
    Route::put('{id}', [TermekController::class, 'update']);
    Route::delete('{id}', [TermekController::class, 'destroy']);
});

->prefix('termek_valtozatok')
->group(function () {
    Route::get('/', [TermekValtozatokController::class, 'index']);
    Route::get('{id}', [TermekValtozatokController::class, 'show']);
    Route::post('/', [TermekValtozatokController::class, 'store']);
    Route::put('{id}', [TermekValtozatokController::class, 'update']);
    Route::delete('{id}', [TermekValtozatokController::class, 'destroy']);
});

->prefix('kosar')
->group(function () {
    Route::get('/', [KosarController::class, 'index']);
    Route::get('{id}', [KosarController::class, 'show']);
    Route::post('/', [KosarController::class, 'store']);
    Route::put('{id}', [KosarController::class, 'update']);
    Route::delete('{id}', [KosarController::class, 'destroy']);
});

->prefix('rendelesek')
->group(function () {
    Route::get('/', [RendelesController::class, 'index']);
    Route::get('{id}', [RendelesController::class, 'show']);
    Route::post('/', [RendelesController::class, 'store']);
    Route::put('{id}', [RendelesController::class, 'update']);
    Route::delete('{id}', [RendelesController::class, 'destroy']);
});

->prefix('rendeles_tetelek')
->group(function () {
    Route::get('/', [RendelesTetelController::class, 'index']);
    Route::get('{id}', [RendelesTetelController::class, 'show']);
    Route::post('/', [RendelesTetelController::class, 'store']);
    Route::put('{id}', [RendelesTetelController::class, 'update']);
    Route::delete('{id}', [RendelesTetelController::class, 'destroy']);
});

->prefix('fizetesek')
->group(function () {
    Route::get('/', [FizetesController::class, 'index']);
    Route::get('{id}', [FizetesController::class, 'show']);
    Route::post('/', [FizetesController::class, 'store']);
    Route::put('{id}', [FizetesController::class, 'update']);
    Route::delete('{id}', [FizetesController::class, 'destroy']);
});



