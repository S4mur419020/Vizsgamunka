<?php

namespace Database\Seeders;

use App\Models\Felhasznalo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            NyelvSeeder::class,
            SzekhelySeeder::class,
            TelephelySeeder::class,
            FelhasznaloSeeder::class,
            KategoriakSeeder::class,
            MarkakSeeder::class,
            TermekekSeeder::class,
            TermekValtozatokSeeder::class,
            MeretSeeder::class,
            KeszletSeeder::class,
            KosarSeeder::class,
            LearazasSeeder::class,
            ArSeeder::class,
            FizetesSeeder::class,
            RendelesSeeder::class,           
            RendelesTetelSeeder::class,                  
            BlogSeeder::class,
            ModositasSeeder::class,
            RegisztracioSeeder::class,
            SzallitasiCimSeeder::class,
            RegioSeeder::class,
        ]);

    }
}
