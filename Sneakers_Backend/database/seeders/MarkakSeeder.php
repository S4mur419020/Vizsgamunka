<?php

namespace Database\Seeders;

use App\Models\Markak;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MarkakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $markak = [
            'Nike', 'Adidas', 'New Balance', 'Asics', 'Under Armour', 'Vans', 
            'Converse', 'Nike SB', 'Adidas Originals', 'Puma', 'Balenciaga', 
            'Alexander McQueen', 'Gucci', 'Off-White', 'Maison Margiela', 'Veja', 
            'Allbirds', 'Cariuma', 'Adidas x Parley', 'Nike Space Hippie', 
            'Air Jordan', 'Nike Dunk', 'Adidas Forum', 'Puma Clyde', 'Reebok Question',
            'Maison Mihara Yasuhiro', 'Yeezy', 'Timberland', 'Crocs', 'Jordan', 'Supreme', 
            'Lanvin', 'Travis Scott', 'Denim Tears', 'BAPE', 'Reebok', 'FILA', 'Vans Vault', 
            'Champion', 'Skechers', 'Salomon', 'The North Face', 'Ugg', 'Dr. Martens'
        ];

        foreach ($markak as $nev) {
            Markak::create(['nev' => $nev]);
        }
    }
}
