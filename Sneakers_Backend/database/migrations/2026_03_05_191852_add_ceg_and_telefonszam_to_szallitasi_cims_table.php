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
        Schema::table('szallitasi_cims', function (Blueprint $table) {
            // Hozzáadjuk a hiányzó oszlopokat
            $table->string('ceg', 100)->nullable()->after('utca_szam');
            $table->string('telefonszam', 20)->nullable()->after('ceg');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('szallitasi_cims', function (Blueprint $table) {
            $table->dropColumn(['ceg', 'telefonszam']);
        });
    }
};
