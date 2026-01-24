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
        Schema::create('modositas', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('felhasznalo_id');
            $table->dateTime('modositas_ideje');
            $table->string('tabla_nev', 50);
            $table->unsignedBigInteger('rekord_id');
            $table->string('muvelet_tipus', 50);
            $table->text('valtozasok');

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
        Schema::dropIfExists('modositas');
    }
};
