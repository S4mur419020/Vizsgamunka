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
                'kepUrl' => 'NikeAirmax90.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => ' Nike Revolution 6 ',
                'kategoria_id' => 2,
                'marka_id' => 1,
                'nem' => 'no',
                'anyag' => 'mesh',
                'kepUrl' => 'NikeRevolution6.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Nike Court Vision Low',
                'kategoria_id' => 3,
                'marka_id' => 1,
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'kepUrl' => 'NikeCourtVision.jpg',
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
                'kepUrl' => 'AdidasSuperstar.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Adidas Ultraboost 22',
                'kategoria_id' => 5,
                'marka_id' => 2,
                'nem' => 'ferfi',
                'anyag' => 'primeknit',
                'kepUrl' => 'AdidasUltraboost22.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Adidas Harden Vol. 7',
                'kategoria_id' => 6,
                'marka_id' => 2,
                'nem' => 'ferfi',
                'anyag' => 'textil',
                'kepUrl' => 'AdidasHardenVol7.jpg',
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
                'kepUrl' => 'PumaRSX.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Puma Suede Classic',
                'kategoria_id' => 8,
                'marka_id' => 3,
                'nem' => 'ferfi',
                'anyag' => 'velúr',
                'kepUrl' => 'PumaSuedeClassic.jpg',
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
                'kepUrl' => 'JordanOneTake4.jpg',
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
                'kepUrl' => 'ReebokClassicLeather.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nev' => 'Reebok Question Mid',
                'kategoria_id' => 11,
                'marka_id' => 5,
                'nem' => 'ferfi',
                'anyag' => 'bőr',
                'kepUrl' => 'ReebokQuestionMid.jpg',
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
                'kepUrl' => 'VansOldSkool.jpg',
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
                'kepUrl' => 'NewBalance574.jpg',
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
                'kepUrl' => 'ConverseAllStar.jpg',
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
                'kepUrl' => 'NikeSBDunkLow.jpg',
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
                'kepUrl' => 'AdidasGazelle.jpg',
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
                'kepUrl' => 'AirJordan1Mid.jpg',
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
                'kepUrl' => 'AdidasForumLow.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Balenciaga
            [
                'nev' => 'Balenciaga Triple S',
                'kategoria_id' => 17,
                'marka_id' => 11,
                'nem' => 'ferfi',
                'anyag' => 'bőr',
                'kepUrl' => 'BaleciagaTripleS.jpg',
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
                'kepUrl' => 'AlexanderMcQueen.jpg',
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
                'kepUrl' => 'GucciRhyton.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Off-White
            [
                'nev' => 'Off-White Odsy-1000',
                'kategoria_id' => 20,
                'marka_id' => 14,
                'nem' => 'ferfi',
                'anyag' => 'textil',
                'kepUrl' => 'Odsy1000.jpg',
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
                'kepUrl' => 'MaisonMargelaReplica.jpg',
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
                'kepUrl' => 'VejaV10.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Allbirds
            [
                'nev' => 'Allbirds Wool Runner',
                'kategoria_id' => 25,
                'marka_id' => 17,
                'nem' => 'ferfi',
                'anyag' => 'gyapjú',
                'kepUrl' => 'AllbirdWoolRunner.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Cariuma
            [
                'nev' => 'Cariuma OCA Low',
                'kategoria_id' => 26,
                'marka_id' => 18,
                'nem' => 'no',
                'anyag' => 'vászon',
                'kepUrl' => 'CariumaOCA.jpg',
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
                'kepUrl' => 'AdidasXParley.jpg',
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
                'kepUrl' => 'NikeSpaceHippie04.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
