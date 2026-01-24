<?php

namespace Database\Seeders;

use App\Models\Rendeles_tetel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RendelesTetelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rendeles_tetel::insert([
            [
                'rendeles_id' => 1,
                'termek_id' => 1,
                'meret_id' => 1,
                'mennyiseg' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
