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
            ]
        ]);
    }
}
