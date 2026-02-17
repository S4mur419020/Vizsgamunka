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
        Schema::create('termekeks', function (Blueprint $table) {
            $table->id('cikkszam');
            $table->string('nev', 50);

            $table->text('leiras')->nullable();
            $table->string('nem', 10);
            $table->string('anyag', 50);
            $table->integer('ar')->default(0);
            $table->boolean('elerheto')->default(true);

            $table->foreignId('marka_id')
                ->constrained('markaks')
                ->cascadeOnDelete();

            $table->foreignId('kategoria_id')
                ->constrained('kategoriaks')
                ->cascadeOnDelete();
            $table->string('kepUrl', 255);
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termekeks');

        Schema::table('termekeks', function (Blueprint $table) {
            $table->dropColumn('ar');
        });
    }
};
