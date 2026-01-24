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
        Schema::create('fizetes', function (Blueprint $table) {
            $table->id('fizetesimod_id');
            $table->string('fizetesi_mod', 50);
            $table->string('tranzakcio_id', 50)->nullable();
            $table->string('statusz', 50);
            $table->dateTime('datum');
            $table->unsignedBigInteger('felhasznalo_id');
            $table->foreign('felhasznalo_id')->references('felhasznalo_id')->on('felhasznalos')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fizetes');
    }
};
