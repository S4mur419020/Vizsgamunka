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
        Schema::create('felhasznalos', function (Blueprint $table) {
            $table->id('felhasznalo_id');
            $table->string('nev', 50);
            $table->string('email', 50)->unique;
            $table->string('jelszo', 255);

            $table->string('salutation')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('alias')->nullable();
            $table->integer('birth_day')->nullable();
            $table->integer('birth_month')->nullable();
            $table->integer('birth_year')->nullable();
            $table->longText('profile_image')->nullable();

            $table->string('telefonszam', 50)->nullable();
            $table->dateTime('regisztracio_datuma')->useCurrent();
            $table->boolean('aktiv')->default(true);

            $table->foreignId('nyelv_id')->constrained('nyelvs')->onDelete('cascade');
            $table->foreignId('szekhely_id')->constrained('szekhelies')->onDelete('cascade');
            $table->foreignId('role_id')->nullable()->constrained('roles')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('felhasznalos');
    }
};
