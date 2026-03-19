<?php

namespace Database\Seeders;

use App\Models\Szekhely;
use Illuminate\Database\Seeder;

class SzekhelySeeder extends Seeder
{
    public function run(): void
    {
        Szekhely::insert([
            [
                'id' => 1,
                'nev' => 'Budapest Központ',
                'cim' => 'Fő utca 1',
                'orszag' => 'Magyarország',
                'varos' => 'Budapest',
                'iranyitoszam' => '1011',
                'email' => 'budapest@bolt.hu',
                'telefon' => '+3612345678',
                'kep_url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
                'nyitvatartas' => 'Hétfő - Vasárnap: 11:00 - 20:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'nev' => 'Debreceni depot',
                'cim' => 'Fő utca 1',
                'orszag' => 'Magyarország',
                'varos' => 'Debrecen',
                'iranyitoszam' => '4024',
                'email' => 'debrecen@bolt.hu',
                'telefon' => '+3652111222',
                'kep_url' => 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
                'nyitvatartas' => 'Hétfő - Szombat: 09:00 - 18:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'nev' => 'Békéscsabai depot',
                'cim' => 'Fő utca 1',
                'orszag' => 'Magyarország',
                'varos' => 'Békéscsaba',
                'iranyitoszam' => '5600',
                'email' => 'bekescsaba@bolt.hu',
                'telefon' => '+3666333444',
                'kep_url' => 'https://images.unsplash.com/photo-1534433843472-6ae4130edbd3',
                'nyitvatartas' => 'Hétfő - Péntek: 08:00 - 17:00',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}