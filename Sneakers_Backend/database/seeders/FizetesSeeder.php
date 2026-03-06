<?php

namespace Database\Seeders;

use App\Models\Fizetes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FizetesSeeder extends Seeder
{
    public function run(): void
    {
        Fizetes::insert([
            [
                'fizetesi_mod' => 'Bankkártya',
                'tranzakcio_id' => null,
                'statusz' => 'teljesítve',
                'datum' => now(),
                'felhasznalo_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fizetesi_mod' => 'Utánvét',
                'tranzakcio_id' => null,
                'statusz' => 'függőben',
                'datum' => now(),
                'felhasznalo_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
