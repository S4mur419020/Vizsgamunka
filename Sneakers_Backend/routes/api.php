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

Route::get('/kategoriak', [KategoriakController::class, 'index']);
Route::get('/kategoriak/{id}', [KategoriakController::class, 'show']);
Route::post('/kategoriak', [KategoriakController::class, 'store']);
Route::put('/kategoriak/{id}', [KategoriakController::class, 'update']);
Route::delete('/kategoriak/{id}', [KategoriakController::class, 'destroy']);

Route::get('/markak', [MarkakController::class, 'index']);
Route::get('/markak/{id}', [MarkakController::class, 'show']);
Route::post('/markak', [MarkakController::class, 'store']);
Route::put('/markak/{id}', [MarkakController::class, 'update']);
Route::delete('/markak/{id}', [MarkakController::class, 'destroy']);

Route::get('/termekek', [TermekController::class, 'index']);
Route::get('/termekek/{id}', [TermekController::class, 'show']);
Route::post('/termekek', [TermekController::class, 'store']);
Route::put('/termekek/{id}', [TermekController::class, 'update']);
Route::delete('/termekek/{id}', [TermekController::class, 'destroy']);

Route::get('/termek_valtozatok', [TermekValtozatokController::class, 'index']);
Route::get('/termek_valtozatok/{id}', [TermekValtozatokController::class, 'show']);
Route::post('/termek_valtozatok', [TermekValtozatokController::class, 'store']);
Route::put('/termek_valtozatok/{id}', [TermekValtozatokController::class, 'update']);
Route::delete('/termek_valtozatok/{id}', [TermekValtozatokController::class, 'destroy']);

Route::get('/kosar', [KosarController::class, 'index']);
Route::get('/kosar/{id}', [KosarController::class, 'show']);
Route::post('/kosar', [KosarController::class, 'store']);
Route::put('/kosar/{id}', [KosarController::class, 'update']);
Route::delete('/kosar/{id}', [KosarController::class, 'destroy']);

Route::get('/rendelesek', [RendelesController::class, 'index']);
Route::get('/rendelesek/{id}', [RendelesController::class, 'show']);
Route::post('/rendelesek', [RendelesController::class, 'store']);
Route::put('/rendelesek/{id}', [RendelesController::class, 'update']);
Route::delete('/rendelesek/{id}', [RendelesController::class, 'destroy']);

Route::get('/rendeles_tetelek', [RendelesTetelController::class, 'index']);
Route::get('/rendeles_tetelek/{id}', [RendelesTetelController::class, 'show']);
Route::post('/rendeles_tetelek', [RendelesTetelController::class, 'store']);
Route::put('/rendeles_tetelek/{id}', [RendelesTetelController::class, 'update']);
Route::delete('/rendeles_tetelek/{id}', [RendelesTetelController::class, 'destroy']);

Route::get('/fizetesek', [FizetesController::class, 'index']);
Route::get('/fizetesek/{id}', [FizetesController::class, 'show']);
Route::post('/fizetesek', [FizetesController::class, 'store']);
Route::put('/fizetesek/{id}', [FizetesController::class, 'update']);
Route::delete('/fizetesek/{id}', [FizetesController::class, 'destroy']);


