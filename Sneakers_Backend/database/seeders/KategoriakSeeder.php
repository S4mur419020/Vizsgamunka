<?php

namespace Database\Seeders;

use App\Models\Kategoriak;
use Illuminate\Database\Seeder;

class KategoriakSeeder extends Seeder
{
    public function run(): void
    {
        Kategoriak::insert([
            // 1-3: Nike
            ['marka' => 'Nike', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike', 'tipus' => 'Sport', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike', 'tipus' => 'Utcai viselet', 'created_at' => now(), 'updated_at' => now()],

            // 4-6: Adidas
            ['marka' => 'Adidas', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Lifestyle', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // 7-8: Puma
            ['marka' => 'Puma', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Puma', 'tipus' => 'Retro', 'created_at' => now(), 'updated_at' => now()],

            // 9: Jordan
            ['marka' => 'Jordan', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // 10-11: Reebok
            ['marka' => 'Reebok', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Reebok', 'tipus' => 'Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // 12-16: Vegyes márkák
            ['marka' => 'Vans', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'New Balance', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Converse', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike SB', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas Originals', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // 17-21: Luxus / Designer
            ['marka' => 'Balenciaga', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Alexander McQueen', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Gucci', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Off-White', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Maison Margiela', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // 22-23: Speciális modellek
            ['marka' => 'Air Jordan', 'tipus' => 'Utcai', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas', 'tipus' => 'Retro Kosaras', 'created_at' => now(), 'updated_at' => now()],

            // 24-28: Fenntartható / Környezetbarát
            ['marka' => 'Veja', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Allbirds', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Cariuma', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Adidas x Parley', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],
            ['marka' => 'Nike Space Hippie', 'tipus' => 'Divat', 'created_at' => now(), 'updated_at' => now()],

            // 29-40: Jordan 4 és AF1 variációk
            ['marka' => 'Jordan', 'tipus' => 'Retro 4', 'created_at' => now(), 'updated_at' => now()], // 29
            ['marka' => 'Nike', 'tipus' => 'AF1 Custom', 'created_at' => now(), 'updated_at' => now()], // 30
            ['marka' => 'Nike', 'tipus' => 'AF1 Supreme', 'created_at' => now(), 'updated_at' => now()], // 31
            ['marka' => 'Nike', 'tipus' => 'AF1 Special', 'created_at' => now(), 'updated_at' => now()], // 32
            ['marka' => 'Nike', 'tipus' => 'AF1 Rope', 'created_at' => now(), 'updated_at' => now()], // 33
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 Special', 'created_at' => now(), 'updated_at' => now()], // 34
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 Limited', 'created_at' => now(), 'updated_at' => now()], // 35
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 Premium', 'created_at' => now(), 'updated_at' => now()], // 36
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 SE', 'created_at' => now(), 'updated_at' => now()], // 37
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 OG', 'created_at' => now(), 'updated_at' => now()], // 38
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 Thunder', 'created_at' => now(), 'updated_at' => now()], // 39
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 Uni Blue', 'created_at' => now(), 'updated_at' => now()], // 40

            // 41-48: Jordan 1 High/Low
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 Low', 'created_at' => now(), 'updated_at' => now()], // 41
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High OG', 'created_at' => now(), 'updated_at' => now()], // 42
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High Special', 'created_at' => now(), 'updated_at' => now()], // 43
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High Limited', 'created_at' => now(), 'updated_at' => now()], // 44
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High Collaboration', 'created_at' => now(), 'updated_at' => now()], // 45
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High SE', 'created_at' => now(), 'updated_at' => now()], // 46
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High Custom', 'created_at' => now(), 'updated_at' => now()], // 47
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 Low SE', 'created_at' => now(), 'updated_at' => now()], // 48

            // 49-51: Travis Scott
            ['marka' => 'Jordan', 'tipus' => 'Travis Scott Low Black', 'created_at' => now(), 'updated_at' => now()], // 49
            ['marka' => 'Jordan', 'tipus' => 'Travis Scott Low Brown', 'created_at' => now(), 'updated_at' => now()], // 50
            ['marka' => 'Jordan', 'tipus' => 'Travis Scott Low Mocha', 'created_at' => now(), 'updated_at' => now()], // 51

            // 52-55: Jordan 1 & 11
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 Low White', 'created_at' => now(), 'updated_at' => now()], // 52
            ['marka' => 'Jordan', 'tipus' => 'Retro 11 DMP', 'created_at' => now(), 'updated_at' => now()], // 53
            ['marka' => 'Jordan', 'tipus' => 'Retro 11 Gamma', 'created_at' => now(), 'updated_at' => now()], // 54
            ['marka' => 'Jordan', 'tipus' => 'Retro 11 Pearl', 'created_at' => now(), 'updated_at' => now()], // 55

            // 56-62: Vegyes vége
            ['marka' => 'Maison Mihara Yasuhiro', 'tipus' => 'Peterson', 'created_at' => now(), 'updated_at' => now()], // 56
            ['marka' => 'Nike', 'tipus' => 'AF1 Supreme Black', 'created_at' => now(), 'updated_at' => now()], // 57
            ['marka' => 'Jordan', 'tipus' => 'Retro 4 Military', 'created_at' => now(), 'updated_at' => now()], // 58
            ['marka' => 'Nike', 'tipus' => 'Dunk Low', 'created_at' => now(), 'updated_at' => now()], // 59
            ['marka' => 'Adidas', 'tipus' => 'Campus 00s', 'created_at' => now(), 'updated_at' => now()], // 60
            ['marka' => 'Yeezy', 'tipus' => 'Slide', 'created_at' => now(), 'updated_at' => now()], // 61
            ['marka' => 'Nike', 'tipus' => 'Air Max Plus', 'created_at' => now(), 'updated_at' => now()], // 62

            // --- EZ MARADT KI AZ ELŐBB: 63-66 ---
            ['marka' => 'Timberland', 'tipus' => 'Bakancs', 'created_at' => now(), 'updated_at' => now()], // 63
            ['marka' => 'Crocs', 'tipus' => 'Kollaboráció', 'created_at' => now(), 'updated_at' => now()], // 64
            ['marka' => 'Jordan', 'tipus' => 'Travis Scott Canary', 'created_at' => now(), 'updated_at' => now()], // 65
            ['marka' => 'Jordan', 'tipus' => 'Retro 1 High Bred', 'created_at' => now(), 'updated_at' => now()], // 66
        ]);
    }
}
