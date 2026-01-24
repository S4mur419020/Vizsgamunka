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
        Schema::create('termek_valtozatoks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('termek_id');
            $table->string('nev');
            $table->boolean('elerheto')->default(true);

            $table->foreign('termek_id')
                ->references('cikkszam')
                ->on('termekeks')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termek_valtozatoks');
    }
};
