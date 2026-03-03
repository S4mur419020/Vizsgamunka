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
            // Általános adatok
            NyelvSeeder::class,
            SzekhelySeeder::class,
            TelephelySeeder::class,

            // Felhasználók 
            FelhasznaloSeeder::class,

            // Termékek és kapcsolódó táblák
            KategoriakSeeder::class,
            MarkakSeeder::class,
            TermekekSeeder::class,
            TermekValtozatokSeeder::class,

            // Méretek 
            MeretSeeder::class,

            // Készlet és kosár
            KeszletSeeder::class,
            KosarSeeder::class,

            // Ár, akció
            LearazasSeeder::class,
            ArSeeder::class,

            // Fizetés 
            FizetesSeeder::class,

            // Rendelések és rendelés tételek
            RendelesSeeder::class,           
            RendelesTetelSeeder::class,      

            // Blog, módosítások, regisztráció, szállítási címek
            BlogSeeder::class,
            ModositasSeeder::class,
            RegisztracioSeeder::class,
            SzallitasiCimSeeder::class,
        ]);

    }
}
