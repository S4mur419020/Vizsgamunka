<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        Blog::insert([
            [
                'cim' => 'Első blogbejegyzés',
                'szerzo_id' => 1,
                'nyelv_id' => 1,  
                'tartalom' => 'Ez egy teszt blog.',
                'publikacio_datuma' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cim' => 'Második blogbejegyzés',
                'szerzo_id' => 1,
                'nyelv_id' => 1,  
                'tartalom' => 'Ez egy második teszt blog.',
                'publikacio_datuma' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
