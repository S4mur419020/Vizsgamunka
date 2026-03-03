<?php

namespace Database\Seeders;

use App\Models\Termek_valtozatok;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TermekValtozatokSeeder extends Seeder
{
    public function run(): void
    {
        $valtozatok = [];
        $meretek = [36, 37, 38, 39, 40, 41, 42, 43, 44];
        $szinek = ['Fehér', 'Fekete', 'Piros', 'Kék', 'Zöld', 'Szürke'];

        $termekek = Termek_valtozatok::all();

        foreach ($termekek as $termek) {
            foreach ($szinek as $szin) {
                foreach ($meretek as $meret) {
                    
                    $elerheto = rand(0, 1) === 1;

                    $valtozatok[] = [
                        'termek_id' => $termek->id,
                        'nev' => "{$szin} – {$meret}",
                        'elerheto' => $elerheto,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        Termek_valtozatok::insert($valtozatok);
    }
}
