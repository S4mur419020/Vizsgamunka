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
        Schema::create('telephelies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('szekhely_id');
            $table->string('nev', 50);
            $table->string('tipus', 50);
            $table->string('cim', 100);
            $table->foreign('szekhely_id')
                ->references('id')
                ->on('szekhelies')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('telephelies');
    }
};
