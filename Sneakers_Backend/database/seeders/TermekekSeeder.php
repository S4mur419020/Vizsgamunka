<?php

namespace Database\Seeders;

use App\Models\Termekek;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TermekekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $kategoriak = DB::table('kategoriaks')->pluck('id', 'megnevezes')->toArray();

        $termekek = [

            // 1 Nike
            [
                'nev' => 'Air Max 90',
                'marka_id' => 1,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Klasszikus Nike futócipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Air Force 1',
                'marka_id' => 1,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus utcai sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Pegasus',
                'marka_id' => 1,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Kényelmes futócipő',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 2 Adidas
            [
                'nev' => 'Ultraboost',
                'marka_id' => 2,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Prémium futócipő',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Stan Smith',
                'marka_id' => 2,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Letisztult utcai cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Superstar',
                'marka_id' => 2,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Retro klasszikus',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 3 New Balance
            [
                'nev' => 'NB 574',
                'marka_id' => 3,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Kényelmes lifestyle sneaker',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'NB 550',
                'marka_id' => 3,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Kosaras ihletésű cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'NB 990',
                'marka_id' => 3,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Prémium futócipő',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 4 Asics
            [
                'nev' => 'Gel-Kayano',
                'marka_id' => 4,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Stabil futócipő',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Gel-Nimbus',
                'marka_id' => 4,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Extra csillapítás',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Japan S',
                'marka_id' => 4,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Retro utcai sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 5 Under Armour
            [
                'nev' => 'HOVR Phantom',
                'marka_id' => 5,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Modern futócipő',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Charged Rogue',
                'marka_id' => 5,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Edzőcipő',
                'nem' => 'férfi',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Curry Flow',
                'marka_id' => 5,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Kosárlabda cipő',
                'nem' => 'férfi',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 6 Vans
            [
                'nev' => 'Old Skool',
                'marka_id' => 6,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Skate klasszikus',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],
            [
                'nev' => 'Sk8-Hi',
                'marka_id' => 6,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Magasszárú sneaker',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],
            [
                'nev' => 'Authentic',
                'marka_id' => 6,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Minimalista cipő',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],

            // 7 Converse
            [
                'nev' => 'Chuck Taylor',
                'marka_id' => 7,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Klasszikus vászoncipő',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],
            [
                'nev' => 'Chuck 70',
                'marka_id' => 7,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Prémium kivitel',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],
            [
                'nev' => 'Run Star Hike',
                'marka_id' => 7,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Platformos sneaker',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],

            // 8 Nike SB
            [
                'nev' => 'SB Dunk',
                'marka_id' => 8,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Skate cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Chron 2',
                'marka_id' => 8,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Skateboard cipő',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],
            [
                'nev' => 'Blazer SB',
                'marka_id' => 8,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Retro skate stílus',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 9 Adidas Originals
            [
                'nev' => 'Gazelle',
                'marka_id' => 9,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus lifestyle cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Samba',
                'marka_id' => 9,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Klasszikus utcai sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Campus',
                'marka_id' => 9,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Mindennapi viselet',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 10 Puma
            [
                'nev' => 'Suede Classic',
                'marka_id' => 10,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Puma klasszikus',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'RS-X',
                'marka_id' => 10,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Modern dizájn',
                'nem' => 'férfi/női',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Cali',
                'marka_id' => 10,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Női lifestyle cipő',
                'nem' => 'női',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 11 Balenciaga 
            [
                'nev' => 'Triple S',
                'marka_id' => 11,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Luxus sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Track',
                'marka_id' => 11,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Oversized dizájn',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Speed',
                'marka_id' => 11,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Zokni sneaker',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 12 Alexander McQueen
            [
                'nev' => 'Oversized Sneaker',
                'marka_id' => 12,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus vastagtalpú sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Court Trainer',
                'marka_id' => 12,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Letisztult prémium cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Sprint Runner',
                'marka_id' => 12,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Sportos luxus sneaker',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 13 Gucci
            [
                'nev' => 'Ace Sneaker',
                'marka_id' => 13,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus Gucci sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Rhyton',
                'marka_id' => 13,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Vastagtalpú designer cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Screener',
                'marka_id' => 13,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Vintage stílusú luxus sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 14 Off-White
            [
                'nev' => 'Out Of Office',
                'marka_id' => 14,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Streetwear prémium sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Arrow Sneaker',
                'marka_id' => 14,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus Off-White dizájn',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Vulcanized',
                'marka_id' => 14,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Minimalista vászon sneaker',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],

            // 15 Maison Margiela
            [
                'nev' => 'Replica',
                'marka_id' => 15,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus Replica modell',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Tabi Sneaker',
                'marka_id' => 15,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Megosztó luxus dizájn',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Evolution',
                'marka_id' => 15,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Sportos prémium cipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 16 Veja
            [
                'nev' => 'V-10',
                'marka_id' => 16,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Fenntartható bőr sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Campo',
                'marka_id' => 16,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Minimalista eco cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Esplar',
                'marka_id' => 16,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Klasszikus fenntartható sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 17 Allbirds
            [
                'nev' => 'Wool Runner',
                'marka_id' => 17,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Gyapjú kényelmi cipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Tree Dasher',
                'marka_id' => 17,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Könnyű eco futócipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Tree Piper',
                'marka_id' => 17,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Mindennapi kényelmes cipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 18 Cariuma
            [
                'nev' => 'OCA Low',
                'marka_id' => 18,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Fenntartható vászon sneaker',
                'nem' => 'unisex',
                'anyag' => 'vászon',
                'elerheto' => true
            ],
            [
                'nev' => 'CATIBA Pro',
                'marka_id' => 18,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Skate ihletésű cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Salvas',
                'marka_id' => 18,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Prémium eco sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 19 Adidas x Parley
            [
                'nev' => 'Ultraboost Parley',
                'marka_id' => 19,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Újrahasznosított futócipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => '4D Run Parley',
                'marka_id' => 19,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Innovatív 4D talptechnológia',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Terrex Parley',
                'marka_id' => 19,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Outdoor eco cipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 20 Nike Space Hippie
            [
                'nev' => 'Space Hippie 01',
                'marka_id' => 20,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Újrahasznosított Nike sneaker',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Space Hippie 03',
                'marka_id' => 20,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Könnyű eco futócipő',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Space Hippie 04',
                'marka_id' => 20,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Streetwear eco sneaker',
                'nem' => 'unisex',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 21 Air Jordan
            [
                'nev' => 'Air Jordan 1',
                'marka_id' => 21,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Legendás kosaras cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Air Jordan 4',
                'marka_id' => 21,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Ikonikus Jordan modell',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Air Jordan 11',
                'marka_id' => 21,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Prémium kosaras cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 22 Nike Dunk
            [
                'nev' => 'Dunk Low',
                'marka_id' => 22,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Népszerű street sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Dunk High',
                'marka_id' => 22,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Magasszárú klasszikus',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Dunk SB',
                'marka_id' => 22,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Skate verzió',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 23 Adidas Forum
            [
                'nev' => 'Forum Low',
                'marka_id' => 23,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Klasszikus kosaras sneaker',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Forum Mid',
                'marka_id' => 23,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Középmagas szárú dizájn',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Forum 84',
                'marka_id' => 23,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Vintage adidas modell',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

            // 24 Puma Clyde
            [
                'nev' => 'Clyde OG',
                'marka_id' => 24,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Kosaras klasszikus',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Clyde Hardwood',
                'marka_id' => 24,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Modern kosaras cipő',
                'nem' => 'férfi',
                'anyag' => 'szövet',
                'elerheto' => true
            ],
            [
                'nev' => 'Clyde All-Pro',
                'marka_id' => 24,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Teljesítményorientált cipő',
                'nem' => 'férfi',
                'anyag' => 'szövet',
                'elerheto' => true
            ],

            // 25 Reebok Question
            [
                'nev' => 'Question Mid',
                'marka_id' => 25,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Allen Iverson klasszikus',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Question Low',
                'marka_id' => 25,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Alacsonyszárú változat',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],
            [
                'nev' => 'Question Vintage',
                'marka_id' => 25,
                'kategoria_nev' => 'Divat',
                'leiras' => 'Vintage kosaras cipő',
                'nem' => 'unisex',
                'anyag' => 'bőr',
                'elerheto' => true
            ],

        ];

        foreach ($termekek as &$t) {
            $t['kategoria_id'] = $kategoriak[$t['kategoria_nev']];
            unset($t['kategoria_nev']);
            $t['created_at'] = now();
            $t['updated_at'] = now();
        }

        Termekek::insert($termekek);
    }
}
