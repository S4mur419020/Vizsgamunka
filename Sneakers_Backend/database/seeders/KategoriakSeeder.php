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
            // Nike
            ['marka' => 'Nike', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike', 'tipus' => 'Sport', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike', 'tipus' => 'Utcai viselet', 'created_at' => now(), 'updated_at' => now()],

            // Adidas
            ['marka' => 'Adidas', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Lifestyle', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Puma
            ['marka' => 'Puma', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Puma', 'tipus' => 'Retro', 'created_at' => now(), 'updated_at' => now()],

            // Jordan
            ['marka' => 'Jordan', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Reebok
            ['marka' => 'Reebok', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Reebok', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Vans
            ['marka' => 'Vans', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // New Balance
            ['marka' => 'New Balance', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Converse
            ['marka' => 'Converse', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Nike SB
            ['marka' => 'Nike SB', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Adidas Originals
            ['marka' => 'Adidas Originals', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Balenciaga
            ['marka' => 'Balenciaga', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Alexander McQueen
            ['marka' => 'Alexander McQueen', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Gucci
            ['marka' => 'Gucci', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Off-White
            ['marka' => 'Off-White', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Maison Margiela
            ['marka' => 'Maison Margiela', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Veja
            ['marka' => 'Veja', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Allbirds
            ['marka' => 'Allbirds', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Cariuma
            ['marka' => 'Cariuma', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Adidas x Parley
            ['marka' => 'Adidas x Parley', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Nike Space Hippie
            ['marka' => 'Nike Space Hippie', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Air Jordan
            ['marka' => 'Air Jordan', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // Adidas Forum
            ['marka' => 'Adidas Forum', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Yeezy
            ['marka' => 'Yeezy', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Timberland
            ['marka' => 'Timberland', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Timberland', 'tipus' => 'Munkavédelmi', 'created_at' => now(), 'updated_at' => now()],

            // Crocs
            ['marka' => 'Crocs', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // Maison Mihara Yasuhiro
            ['marka' => 'Maison Mihara Yasuhiro', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
