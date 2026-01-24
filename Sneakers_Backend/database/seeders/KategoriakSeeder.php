<?php

namespace Database\Seeders;

use App\Models\Kategoriak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Kategoriak::insert([
            ['megnevezes' => 'Sport', 'created_at' => now(), 'updated_at' => now()],
            ['megnevezes' => 'Utcai viselet', 'created_at' => now(), 'updated_at' => now()],
            ['megnevezes' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['megnevezes' => 'Környezetbarát', 'created_at' => now(), 'updated_at' => now()],
            ['megnevezes' => 'Retro', 'created_at' => now(), 'updated_at' => now()],
            ['megnevezes' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
