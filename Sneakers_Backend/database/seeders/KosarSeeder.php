<?php

namespace Database\Seeders;

use App\Models\Kosar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KosarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kosar::insert([
            ['felhasznalo_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['felhasznalo_id' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
