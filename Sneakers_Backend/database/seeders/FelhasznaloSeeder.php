<?php

namespace Database\Seeders;

use App\Models\Felhasznalo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class FelhasznaloSeeder extends Seeder
{
    public function run(): void
    {
        $adatok = [
            [
                'nev' => 'Főadmin',
                'email' => 'teszt1@example.com',
                'jelszo' => Hash::make('123456'),
                'telefonszam' => '0612345678',
                'regisztracio_datuma' => now(),
                'aktiv' => true,
                'nyelv_id' => 1,
                'szekhely_id' => 1,
                'role_id' => 1,
            ],
        ];

        foreach ($adatok as $adat) {
            Felhasznalo::create($adat);
        }
    }
}