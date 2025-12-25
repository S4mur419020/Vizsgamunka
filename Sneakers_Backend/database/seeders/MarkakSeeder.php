<?php

namespace Database\Seeders;

use App\Models\markak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarkakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        markak::insert([
            ['nev' => 'Nike'],
            ['nev' => 'Adidas'],
            ['nev' => 'New Balance'],
            ['nev' => 'Asics'],
            ['nev' => 'Under Armour'],
            ['nev' => 'Vans'],
            ['nev' => 'Converse'],
            ['nev' => 'Nike SB'],
            ['nev' => 'Adidas Originals'],
            ['nev' => 'Puma'],
            ['nev' => 'Balenciaga'],
            ['nev' => 'Alexander McQueen'],
            ['nev' => 'Gucci'],
            ['nev' => 'Off-White'],
            ['nev' => 'Maison Margiela'],
            ['nev' => 'Veja'],
            ['nev' => 'Allbirds'],
            ['nev' => 'Cariuma'],
            ['nev' => 'Adidas x Parley'],
            ['nev' => 'Nike Space Hippie'],
            ['nev' => 'Air Jordan'],
            ['nev' => 'Nike Dunk'],
            ['nev' => 'Adidas Forum'],
            ['nev' => 'Puma Clyde'],
            ['nev' => 'Reebok Question'],
        ]);
    }
}
