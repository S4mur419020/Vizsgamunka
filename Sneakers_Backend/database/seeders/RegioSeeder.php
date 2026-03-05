<?php

namespace Database\Seeders;

use App\Models\Regio;
use Illuminate\Database\Seeder;

class RegioSeeder extends Seeder
{
    public function run(): void
    {
        $regiok = [
            ['szabvany' => 'AL', 'nev' => 'Albánia'],
            ['szabvany' => 'AD', 'nev' => 'Andorra'],
            ['szabvany' => 'AT', 'nev' => 'Ausztria'],
            ['szabvany' => 'BE', 'nev' => 'Belgium'],
            ['szabvany' => 'BA', 'nev' => 'Bosznia-Hercegovina'],
            ['szabvany' => 'BG', 'nev' => 'Bulgária'],
            ['szabvany' => 'CY', 'nev' => 'Ciprus'],
            ['szabvany' => 'CZ', 'nev' => 'Csehország'],
            ['szabvany' => 'DK', 'nev' => 'Dánia'],
            ['szabvany' => 'EE', 'nev' => 'Észtország'],
            ['szabvany' => 'BY', 'nev' => 'Fehéroroszország'],
            ['szabvany' => 'FI', 'nev' => 'Finnország'],
            ['szabvany' => 'FR', 'nev' => 'Franciaország'],
            ['szabvany' => 'GR', 'nev' => 'Görögország'],
            ['szabvany' => 'GE', 'nev' => 'Grúzia'],
            ['szabvany' => 'NL', 'nev' => 'Hollandia'],
            ['szabvany' => 'HR', 'nev' => 'Horvátország'],
            ['szabvany' => 'IE', 'nev' => 'Írország'],
            ['szabvany' => 'IS', 'nev' => 'Izland'],
            ['szabvany' => 'PL', 'nev' => 'Lengyelország'],
            ['szabvany' => 'LV', 'nev' => 'Lettország'],
            ['szabvany' => 'LI', 'nev' => 'Liechtenstein'],
            ['szabvany' => 'LT', 'nev' => 'Litvánia'],
            ['szabvany' => 'LU', 'nev' => 'Luxemburg'],
            ['szabvany' => 'MK', 'nev' => 'Észak-Macedónia'],
            ['szabvany' => 'HU', 'nev' => 'Magyarország'],
            ['szabvany' => 'MT', 'nev' => 'Málta'],
            ['szabvany' => 'MD', 'nev' => 'Moldova'],
            ['szabvany' => 'MC', 'nev' => 'Monaco'],
            ['szabvany' => 'ME', 'nev' => 'Montenegró'],
            ['szabvany' => 'GB', 'nev' => 'Egyesült Királyság'],
            ['szabvany' => 'DE', 'nev' => 'Németország'],
            ['szabvany' => 'NO', 'nev' => 'Norvégia'],
            ['szabvany' => 'IT', 'nev' => 'Olaszország'],
            ['szabvany' => 'RU', 'nev' => 'Oroszország'],
            ['szabvany' => 'PT', 'nev' => 'Portugália'],
            ['szabvany' => 'RO', 'nev' => 'Románia'],
            ['szabvany' => 'SM', 'nev' => 'San Marino'],
            ['szabvany' => 'ES', 'nev' => 'Spanyolország'],
            ['szabvany' => 'CH', 'nev' => 'Svájc'],
            ['szabvany' => 'SE', 'nev' => 'Svédország'],
            ['szabvany' => 'RS', 'nev' => 'Szerbia'],
            ['szabvany' => 'SK', 'nev' => 'Szlovákia'],
            ['szabvany' => 'SI', 'nev' => 'Szlovénia'],
            ['szabvany' => 'TR', 'nev' => 'Törökország'],
            ['szabvany' => 'UA', 'nev' => 'Ukrajna'],
            ['szabvany' => 'VA', 'nev' => 'Vatikán'],
            ['szabvany' => 'US', 'nev' => 'Amerikai Egyesült Államok'],
        ];

        foreach ($regiok as $regio) {
            Regio::updateOrCreate(
                ['szabvany' => $regio['szabvany']],
                ['nev' => $regio['nev'], 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}