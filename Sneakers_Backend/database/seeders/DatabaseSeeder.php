<?php

namespace Database\Seeders;

use App\Models\User;
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
            KategoriakSeeder::class,
            MarkakSeeder::class,
            TermekekSeeder::class,
            TermekValtozatokSeeder::class,
        ]);
        
        $this->call([
            FelhasznaloSeeder::class,
            SzekhelySeeder::class,
            TelephelySeeder::class,
        ]);

        $this->call([
            TermekekSeeder::class,
            TermekValtozatokSeeder::class,
        ]);

        $this->call([
            KeszletSeeder::class,
            KosarSeeder::class,
        ]);

        $this->call([
            LearazasSeeder::class,
            ArSeeder::class,
            RendelesTetelSeeder::class,
            FizetesSeeder::class,
        ]);

        $this->call([
            BlogSeeder::class,
            ModositasSeeder::class,
            RegisztracioSeeder::class,
            SzallitasiCimSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
