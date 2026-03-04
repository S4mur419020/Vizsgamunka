<?php

namespace Database\Seeders;

use App\Models\Felhasznalo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FelhasznaloSeeder extends Seeder
{
    public function run(): void
    {
        // Az insert helyett a create-et használjuk tömbben, 
        // így a Model beállításai (pl. primaryKey) érvényesülnek.
        $adatok = [
            [
                'nev' => 'Teszt Felhasznalo 1',
                'email' => 'teszt1@example.com',
                'jelszo' => Hash::make('password'),
                'telefonszam' => '0612345678',
                'regisztracio_datuma' => now(),
                'aktiv' => true,
                'nyelv_id' => 1,
                'szekhely_id' => 1,
            ],
            [
                'nev' => 'Teszt Felhasznalo 2',
                'email' => 'teszt2@example.com',
                'jelszo' => Hash::make('password'),
                'telefonszam' => '0612345679',
                'regisztracio_datuma' => now(),
                'aktiv' => true,
                'nyelv_id' => 1,
                'szekhely_id' => 1,
            ],
        ];

        foreach ($adatok as $adat) {
            Felhasznalo::create($adat);
        }
    }
}