<?php

namespace Database\Seeders;

use App\Models\Termekek;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TermekekSeeder extends Seeder
{
    public function run(): void
    {
        Termekek::insert([
            // Nike
            [
                'nev' => 'Nike Air Max 90',
                'kategoria_id' => 1,
                'marka_id' => 1,
                'nem' => 'ferfi',
                'anyag' => 'textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Nike Revolution 6',
                'kategoria_id' => 2,
                'marka_id' => 1,
                'nem' => 'no',
                'anyag' => 'mesh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Nike Court Vision Low',
                'kategoria_id' => 3,
                'marka_id' => 1,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Adidas
            [
                'nev' => 'Adidas Superstar',
                'kategoria_id' => 4,
                'marka_id' => 2,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Adidas Ultraboost 22',
                'kategoria_id' => 5,
                'marka_id' => 2,
                'nem' => 'ferfi',
                'anyag' => 'primeknit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Adidas Harden Vol. 7',
                'kategoria_id' => 6,
                'marka_id' => 2,
                'nem' => 'ferfi',
                'anyag' => 'textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Puma
            [
                'nev' => 'Puma RS-X',
                'kategoria_id' => 7,
                'marka_id' => 3,
                'nem' => 'unisex',
                'anyag' => 'textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Puma Suede Classic',
                'kategoria_id' => 8,
                'marka_id' => 3,
                'nem' => 'ferfi',
                'anyag' => 'velúr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Jordan
            [
                'nev' => 'Jordan One Take 4',
                'kategoria_id' => 9,
                'marka_id' => 4,
                'nem' => 'ferfi',
                'anyag' => 'textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Reebok
            [
                'nev' => 'Reebok Classic Leather',
                'kategoria_id' => 10,
                'marka_id' => 5,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Reebok Question Mid',
                'kategoria_id' => 11,
                'marka_id' => 5,
                'nem' => 'ferfi',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Vans
            [
                'nev' => 'Vans Old Skool',
                'kategoria_id' => 12,
                'marka_id' => 6,
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // New Balance
            [
                'nev' => 'New Balance 574',
                'kategoria_id' => 13,
                'marka_id' => 7,
                'nem' => 'unisex',
                'anyag' => 'velúr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Converse
            [
                'nev' => 'Converse Chuck Taylor All Star',
                'kategoria_id' => 14,
                'marka_id' => 8,
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Nike SB
            [
                'nev' => 'Nike SB Dunk Low',
                'kategoria_id' => 15,
                'marka_id' => 9,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Adidas Originals
            [
                'nev' => 'Adidas Originals Gazelle',
                'kategoria_id' => 16,
                'marka_id' => 10,
                'nem' => 'unisex',
                'anyag' => 'velúr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Air Jordan
            [
                'nev' => 'Air Jordan 1 Mid',
                'kategoria_id' => 22,
                'marka_id' => 22,
                'nem' => 'ferfi',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Adidas Forum
            [
                'nev' => 'Adidas Forum Low',
                'kategoria_id' => 23,
                'marka_id' => 23,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
