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
        Schema::create('keszlets', function (Blueprint $table) {
            $table->integer('cikkszam');
            $table->integer('meretvalasztek');
            $table->string('szabvany', 50);
            $table->integer('mennyiseg');
            $table->primary(['cikkszam', 'meretvalasztek', 'szabvany']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keszlets');
    }
};
