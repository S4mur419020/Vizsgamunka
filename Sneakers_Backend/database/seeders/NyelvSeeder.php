<?php

namespace Database\Seeders;

use App\Models\Nyelv;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class NyelvSeeder extends Seeder
{
    public function run(): void
    {
        Nyelv::insert([
            [
                'id' => 1,
                'kulcs_nev' => 'magyar',
                'nyelv_kod' => 'HU',
                'penznem' => 'HUF',   
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'kulcs_nev' => 'angol',
                'nyelv_kod' => 'EN',
                'penznem' => 'USD',  
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'kulcs_nev' => 'német',
                'nyelv_kod' => 'DE',
                'penznem' => 'EUR',  
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
