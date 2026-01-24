<?php

namespace Database\Seeders;

use App\Models\Termek_valtozatok;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TermekValtozatokSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        $valtozatok = [
            ['termek_id'=>1,'nev'=>'Fekete, 42-es méret','elerheto'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['termek_id'=>1,'nev'=>'Fehér, 43-as méret','elerheto'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['termek_id'=>2,'nev'=>'Piros, 40-es méret','elerheto'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['termek_id'=>2,'nev'=>'Kék, 41-es méret','elerheto'=>true,'created_at'=>now(),'updated_at'=>now()],
        ];

        Termek_valtozatok::insert($valtozatok);
    }
}
