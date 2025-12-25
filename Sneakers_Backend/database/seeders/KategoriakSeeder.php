<?php

namespace Database\Seeders;

use App\Models\kategoriak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        kategoriak::insert([
            ['megnevezas'=>'Sport'],
            ['megnevezas'=>'Utcai viselet'],
            ['megnevezas'=>'Pémium/Divat'],
            ['megnevezas'=>'Környezetbarát'],
            ['megnevezas'=>'Retro'],
            ['megnevezas'=>'Kosaras'],
        ]);
    }
}
