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
        Schema::create('rendeles_tetels', function (Blueprint $table) {
            $table->id('rendelestetel_id');

            $table->unsignedBigInteger('rendeles_id');  // ha van rendeles tábla
            $table->unsignedBigInteger('termek_id');    // BIGINT, egyezik a termekeks.cikkszam
            $table->unsignedBigInteger('meret_id');    // egyezik a merets.meretvalasztek típusával
            $table->integer('mennyiseg');
            $table->integer('egyseg_ar');
            $table->unsignedBigInteger('fizetes_id');
            $table->unsignedBigInteger('telephely_id');

            $table->foreign('termek_id')
                ->references('cikkszam')
                ->on('termekeks')
                ->onDelete('cascade');

            $table->foreign('meret_id')
                ->references('meretvalasztek')
                ->on('merets')
                ->onDelete('cascade');

            $table->foreign('fizetes_id')
                ->references('fizetesimod_id')
                ->on('fizetes')
                ->onDelete('cascade');

            $table->foreign('telephely_id')
                ->references('id')
                ->on('telephelies')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendeles_tetels');
    }
};
