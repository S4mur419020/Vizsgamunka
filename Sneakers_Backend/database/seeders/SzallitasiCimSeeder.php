<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SzallitasiCimSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('szallitasi_cims')->insert([
            [
                'felhasznalo_id' => 1, 
                'orszag'         => 'Magyarország',
                'iranyitoszam'   => '1051',
                'varos'          => 'Budapest',
                'utca_szam'      => 'Október 6. utca 12.',
                'ceg'            => 'Teszt Elek Kft.',
                'telefonszam'    => '+36301234567',
                'megjegyzes'     => 'A kapucsengő rossz, hívjon a futár!',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'felhasznalo_id' => 1,
                'orszag'         => 'Magyarország',
                'iranyitoszam'   => '4024',
                'varos'          => 'Debrecen',
                'utca_szam'      => 'Piac utca 20.',
                'ceg'            => null,
                'telefonszam'    => '+36209876543',
                'megjegyzes'     => 'Másodlagos cím',
                'created_at'     => now(),
                'updated_at'     => now(),
            ]
        ]);
    }
}