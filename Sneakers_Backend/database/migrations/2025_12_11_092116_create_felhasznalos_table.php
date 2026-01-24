<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('felhasznalos', function (Blueprint $table) {
            $table->id('felhasznalo_id');
            $table->string('nev', 50);
            $table->string('email', 50);
            $table->string('jelszo', 255);
            $table->string('telefonszam', 50);
            $table->dateTime('regisztracio_datuma');
            $table->boolean('aktiv');
            $table->foreignId('nyelv_id')->constrained('nyelvs')->onDelete('cascade');
            $table->foreignId('szekhely_id')->constrained('szekhelies')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznalos');
    }
};
