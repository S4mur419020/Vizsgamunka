<?php

namespace Database\Factories;

use App\Models\Felhasznalo;
use App\Models\Nyelv;
use App\Models\Szekhely;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class FelhasznaloFactory extends Factory
{
    protected $model = Felhasznalo::class;

    public function definition(): array
    {
        return [
            'nev' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            // Fontos: a jelszó oszlop neve 'jelszo' legyen, ahogy a Modelben is!
            'jelszo' => Hash::make('password123'), 
            'telefonszam' => $this->faker->phoneNumber(),
            'aktiv' => true,
            // Ez a megoldás dinamikusan keres egy ID-t, vagy készít egyet, ha nincs
            'nyelv_id' => 1, 
            'szekhely_id' => 1,
            'regisztracio_datuma' => now(),
        ];
    }
}