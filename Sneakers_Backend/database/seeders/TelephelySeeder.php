<?php

namespace Database\Seeders;

use App\Models\Telephely;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TelephelySeeder extends Seeder
{
    public function run(): void
    {
        Telephely::insert([
            [
                'nev' => 'Központi raktár',
                'szekhely_id' => 1,
                'tipus' => 'raktar',           
                'cim' => 'Fő út 2',            
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nev' => 'Debreceni depot',
                'szekhely_id' => 2,
                'tipus' => 'depot',           
                'cim' => 'Kossuth utca 10',            
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'nev' => 'Békéscsabai depot',
                'szekhely_id' => 3,
                'tipus' => 'depot',           
                'cim' => 'Virág utca 5',                       
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
