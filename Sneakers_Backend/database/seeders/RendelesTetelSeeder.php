<?php

namespace Database\Seeders;

use App\Models\Rendeles;
use App\Models\Rendeles_tetel;
use App\Models\Termekek;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RendelesTetelSeeder extends Seeder
{
    public function run(): void
    {
        $rendeles = Rendeles::first();
        $termek = Termekek::find(3);
        $mennyiseg = 1;

        Rendeles_tetel::create([
            'rendeles_id' => $rendeles->id,
            'termek_id' => $termek->id,
            'meret_id' => 38,
            'mennyiseg' => $mennyiseg,
            'egyseg_ar' => $termek->ar,
            'fizetes_id' => $rendeles->fizetes_id,
            'telephely_id' => 1,
        ]);

        // Frissítjük a rendelés összegét
        $rendeles->increment('osszeg', $termek->ar * $mennyiseg);
    }
}
