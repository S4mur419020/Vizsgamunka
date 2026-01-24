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

            $table->string('marka', 50);
            $table->string('tipus', 50);

            $table->text('leiras')->nullable();
            $table->string('nem', 10);
            $table->string('anyag', 50);
            $table->boolean('elerheto')->default(true);

            $table->foreign(['marka', 'tipus'])
                ->references(['marka', 'tipus'])
                ->on('kategoriaks')
                ->onDelete('cascade');

            $table->foreignId('marka_id')->constrained('markaks')->onDelete('cascade');

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
    }
};
