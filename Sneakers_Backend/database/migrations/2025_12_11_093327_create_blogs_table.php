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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('cim', 50);
            $table->text('tartalom');
            $table->unsignedBigInteger('szerzo_id');
            $table->dateTime('publikacio_datuma');
            $table->unsignedBigInteger('nyelv_id');

            $table->foreign('szerzo_id')
                ->references('felhasznalo_id')
                ->on('felhasznalos')
                ->onDelete('cascade');

            $table->foreign('nyelv_id')
                ->references('id')
                ->on('nyelvs')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
