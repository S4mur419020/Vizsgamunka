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
        Schema::create('rendeles', function (Blueprint $table) {
            $table->id('rendeles_id');
            $table->unsignedBigInteger('felhasznalo_id');
            $table->unsignedBigInteger('fizetes_id')->nullable();


            $table->unsignedBigInteger('szallitasi_cim_id')->nullable();
            $table->dateTime('datum');

            $table->integer('osszeg');
            $table->string('allapot', 50)->default('feldolgozás alatt');
            $table->timestamps();

            $table->foreign('felhasznalo_id')->references('felhasznalo_id')->on('felhasznalos')->onDelete('cascade');
            $table->foreign('fizetes_id')->references('fizetesimod_id')->on('fizetes')->onDelete('set null');
            $table->foreign('szallitasi_cim_id')->references('szallitasi_cim_id')->on('szallitasi_cims')->onDelete('set Null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendeles');
    }
};
