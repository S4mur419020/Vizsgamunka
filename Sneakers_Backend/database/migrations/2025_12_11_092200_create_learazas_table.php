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
        Schema::create('learazas', function (Blueprint $table) {
            $table->id('akcio');
            $table->string('marka', 50);
            $table->string('tipus', 50);
            $table->integer('akcio_szazalek');
            $table->date('kezdo_datum');
            $table->date('zaro_datum');
            $table->foreign(['marka', 'tipus'])
                ->references(['marka', 'tipus'])
                ->on('kategoriaks')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('learazas');
    }
};
