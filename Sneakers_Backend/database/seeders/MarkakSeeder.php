<?php

namespace Database\Seeders;

use App\Models\Markak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarkakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $markak = [
            ['id' => 1, 'nev' => 'Nike'],
            ['id' => 2, 'nev' => 'Adidas'],
            ['id' => 3, 'nev' => 'Puma'],
            ['id' => 4, 'nev' => 'Jordan'],
            ['id' => 5, 'nev' => 'Reebok'],
            ['id' => 6, 'nev' => 'Vans'],
            ['id' => 7, 'nev' => 'New Balance'],
            ['id' => 8, 'nev' => 'Converse'],
            ['id' => 10, 'nev' => 'Timberland'],
            ['id' => 11, 'nev' => 'Balenciaga'],
            ['id' => 12, 'nev' => 'Alexander McQueen'],
            ['id' => 13, 'nev' => 'Gucci'],
            ['id' => 14, 'nev' => 'Off-White'],
            ['id' => 15, 'nev' => 'Maison Margiela'],
            ['id' => 16, 'nev' => 'Veja'],
            ['id' => 17, 'nev' => 'Allbirds'],
            ['id' => 18, 'nev' => 'Cariuma'],
            ['id' => 22, 'nev' => 'Maison Mihara Yasuhiro'],
            ['id' => 61, 'nev' => 'Yeezy'],
            ['id' => 64, 'nev' => 'Crocs'], 
        ];

        foreach ($markak as $marka) {
            Markak::create($marka);
        }
    }
}
