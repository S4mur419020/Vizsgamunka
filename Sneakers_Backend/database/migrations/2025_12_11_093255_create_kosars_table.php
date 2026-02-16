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
        Schema::create('kosars', function (Blueprint $table) {
            $table->id('kosar_id');

            $table->unsignedBigInteger('felhasznalo_id');
            $table->unsignedBigInteger('termek_id');
            $table->unsignedBigInteger('meret_id');
            $table->integer('mennyiseg');
            $table->dateTime('hozzaadas_datum');

            $table->foreign('felhasznalo_id')
                ->references('felhasznalo_id')   
                ->on('felhasznalos')
                ->onDelete('cascade');

            $table->foreign('termek_id')
                ->references('cikkszam')
                ->on('termekeks')
                ->onDelete('cascade');

            $table->foreign('meret_id')
                ->references('meretvalasztek')
                ->on('merets')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kosars');
    }
};
