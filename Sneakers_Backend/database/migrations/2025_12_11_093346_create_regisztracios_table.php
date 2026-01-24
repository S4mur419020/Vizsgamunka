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
        Schema::create('regisztracios', function (Blueprint $table) {
            $table->id('regisztracio_id');
            $table->unsignedBigInteger('felhasznalo_id');
            $table->dateTime('datum');
            $table->string('felulet', 50);

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
        Schema::dropIfExists('regisztracios');
    }
};
