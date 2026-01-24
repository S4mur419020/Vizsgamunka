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
        Schema::create('nyelvs', function (Blueprint $table) {
            $table->id();
            $table->string('kulcs_nev', 50);
            $table->string('nyelv_kod', 10);
            $table->string('penznem', 10);
            $table->unique(['kulcs_nev', 'nyelv_kod']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nyelvs');
    }
};
