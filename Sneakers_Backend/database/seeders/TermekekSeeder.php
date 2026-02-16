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
                'nev' => ' Nike Revolution 6 ',
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
                //kell még kép
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
            ],
            // Balenciaga
            [
                //kell még kép
                'nev' => 'Balenciaga Triple S',
                'kategoria_id' => 17,
                'marka_id' => 11,
                'nem' => 'ferfi',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Alexander McQueen
            [
                'nev' => 'Alexander McQueen Oversized Sneaker',
                'kategoria_id' => 18,
                'marka_id' => 12,
                'nem' => 'no',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Gucci
            [
                'nev' => 'Gucci Rhyton',
                'kategoria_id' => 19,
                'marka_id' => 13,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Off-White
            [
                //kell még kép
                'nev' => 'Off-White Odsy-1000',
                'kategoria_id' => 20,
                'marka_id' => 14,
                'nem' => 'ferfi',
                'anyag' => 'textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Maison Margiela
            [
                'nev' => 'Maison Margiela Replica',
                'kategoria_id' => 21,
                'marka_id' => 15,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Veja
            [
                'nev' => 'Veja V-10',
                'kategoria_id' => 24,
                'marka_id' => 16,
                'nem' => 'unisex',
                'anyag' => 'textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Allbirds
            [
                //kell még kép
                'nev' => 'Allbirds Wool Runner',
                'kategoria_id' => 25,
                'marka_id' => 17,
                'nem' => 'ferfi',
                'anyag' => 'gyapjú',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Cariuma
            [
                //kell még kép
                'nev' => 'Cariuma OCA Low',
                'kategoria_id' => 26,
                'marka_id' => 18,
                'nem' => 'no',
                'anyag' => 'vászon',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Adidas x Parley
            [
                'nev' => 'Adidas x Parley Ultraboost',
                'kategoria_id' => 27,
                'marka_id' => 19,
                'nem' => 'unisex',
                'anyag' => 'újrahasznosított textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Nike Space Hippie
            [
                'nev' => 'Nike Space Hippie 04',
                'kategoria_id' => 28,
                'marka_id' => 20,
                'nem' => 'ferfi',
                'anyag' => 'újrahasznosított textil',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
