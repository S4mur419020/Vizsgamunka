<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1️⃣ Szerepek létrehozása
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'felhasznalo']);

        // 2️⃣ Felhasználók létrehozása és szerephez rendelése
        User::create([
            'name' => 'Admin Felhasználó',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => $adminRole->id
        ]);

        User::create([
            'name' => 'Normál Felhasználó',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => $userRole->id
        ]);
    }
}
