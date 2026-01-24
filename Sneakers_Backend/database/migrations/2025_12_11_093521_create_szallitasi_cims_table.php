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
        Schema::create('szallitasi_cims', function (Blueprint $table) {
            $table->id('szallitasi_cim_id');
            $table->unsignedBigInteger('felhasznalo_id');
            $table->string('orszag', 50);
            $table->string('iranyitoszam', 50);
            $table->string('varos', 50);
            $table->string('utca_szam', 50);
            $table->text('megjegyzes')->nullable();

            $table->foreign('felhasznalo_id')
                ->references('felhasznalo_id')
                ->on('felhasznalos')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('szallitasi_cims');
    }
};
