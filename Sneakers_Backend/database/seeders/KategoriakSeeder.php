<?php

namespace Database\Seeders;

use App\Models\Kategoriak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriakSeeder extends Seeder
{
    public function run(): void
    {
        Kategoriak::insert([
            // Nike kategóriák
            ['marka' => 'Nike', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike', 'tipus' => 'Sport', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike', 'tipus' => 'Utcai viselet', 'created_at' => now(), 'updated_at' => now()],

            // Adidas kategóriák
            ['marka' => 'Adidas', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Lifestyle', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Puma kategóriák
            ['marka' => 'Puma', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Puma', 'tipus' => 'Retro', 'created_at' => now(), 'updated_at' => now()],

            // Jordan kategóriák
            ['marka' => 'Jordan', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Reebok kategóriák
            ['marka' => 'Reebok', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Reebok', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Vans kategóriák
            ['marka' => 'Vans', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // New Balance kategóriák
            ['marka' => 'New Balance', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Converse kategóriák
            ['marka' => 'Converse', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Nike SB kategóriák
            ['marka' => 'Nike SB', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Adidas Originals kategóriák
            ['marka' => 'Adidas Originals', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Balenciaga kategóriák
            ['marka' => 'Balenciaga', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Alexander McQueen kategóriák
            ['marka' => 'Alexander McQueen', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Gucci kategóriák
            ['marka' => 'Gucci', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Off-White kategóriák
            ['marka' => 'Off-White', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Maison Margiela kategóriák
            ['marka' => 'Maison Margiela', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Veja kategóriák
            ['marka' => 'Veja', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Allbirds kategóriák
            ['marka' => 'Allbirds', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Cariuma kategóriák
            ['marka' => 'Cariuma', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Adidas x Parley kategóriák
            ['marka' => 'Adidas x Parley', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Nike Space Hippie kategóriák
            ['marka' => 'Nike Space Hippie', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Air Jordan kategóriák
            ['marka' => 'Air Jordan', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Timberland kategóriák
            ['marka' => 'Timberland', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Timberland', 'tipus' => 'Munkavédelmi', 'created_at' => now(), 'updated_at' => now()],

            // Crocs kategóriák
            ['marka' => 'Crocs', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Maison Mihara Yasuhiro kategóriák
            ['marka' => 'Maison Mihara Yasuhiro', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
