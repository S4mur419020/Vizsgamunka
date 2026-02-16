<?php

namespace Database\Seeders;

use App\Models\Rendeles;
use App\Models\Rendeles_tetel;
use App\Models\Termekek;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RendelesSeeder extends Seeder
{
    public function run(): void
    {
        dd(Termekek::count());
        $termek1 = Termekek::first();
        $termek2 = Termekek::skip(1)->first();

        if (!$termek1 || !$termek2) {
            throw new \Exception('Nincs elég termék az adatbázisban!');
        }

        $rendeles = Rendeles::create([
            'felhasznalo_id' => 1,
            'fizetes_id' => 1,
            'osszeg' => ($termek1->ar * 2) + ($termek2->ar * 1),
            'allapot' => 'feldolgozás alatt',
        ]);

        Rendeles_tetel::create([
            'rendeles_id' => $rendeles->id,
            'termek_id' => $termek1->id,
            'meret_id' => 36,
            'mennyiseg' => 2,
            'egyseg_ar' => $termek1->ar,
            'fizetes_id' => 1,
            'telephely_id' => 1,
        ]);

        Rendeles_tetel::create([
            'rendeles_id' => $rendeles->id,
            'termek_id' => $termek2->id,
            'meret_id' => 37,
            'mennyiseg' => 1,
            'egyseg_ar' => $termek2->ar,
            'fizetes_id' => 1,
            'telephely_id' => 1,
        ]);
    }
}
