<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f0f0f; color: #ffffff; }
        .table-header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .item-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .item-table th { color: #888; font-size: 12px; text-transform: uppercase; text-align: left; padding: 10px; border-bottom: 1px solid #333; }
        .item-table td { padding: 15px 10px; border-bottom: 1px solid #222; font-size: 14px; }
        .total-section { text-align: right; padding: 20px; background-color: #1a1a1a; border-radius: 4px; }
        .legal-text { color: #666; font-size: 12px; line-height: 1.5; margin-top: 30px; }
        .highlight { color: #d32f2f; font-weight: bold; }
    </style>
</head>
<body style="background-color: #0f0f0f; color: #ffffff; padding: 20px;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="650" border="0" cellspacing="0" cellpadding="0" style="background-color: #111; padding: 40px; border-radius: 8px;">
                    <tr>
                        <td>
                            <h1 style="color: #d32f2f; margin: 0; font-size: 24px; text-transform: uppercase;">Sneaker Shop - Számla</h1>
                            <p style="color: #888; font-size: 12px;">Sneaker Shop Kft. | Budapest, Magyarország</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px 0;">
                            <h2 style="font-size: 28px; margin: 0;">KÖSZÖNJÜK!</h2>
                            <p style="color: #ccc;">Köszönjük a rendelésed, <span class="highlight">{{ $rendeles->felhasznalo->nev ?? 'Vásárlónk' }}</span>!</p>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table class="item-table">
                                <thead>
                                    <tr>
                                        <th>Mennyiség</th>
                                        <th>Termék megnevezése</th>
                                        <th style="text-align: right;">Ár</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($tetelek as $tetel)
                                    <tr>
                                        <td width="100">{{ $tetel['mennyiseg'] }} db</td>
                                        <td>{{ $tetel['nev'] }}</td>
                                        <td style="text-align: right;">{{ number_format($tetel['ar'], 0, ',', ' ') }} Ft</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td class="total-section">
                            <span style="color: #888; margin-right: 20px;">Végösszeg:</span>
                            <span style="font-size: 24px; font-weight: bold; color: #ffffff;">{{ number_format($rendeles->osszeg, 0, ',', ' ') }} Ft</span>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding-top: 30px;">
                            <p style="font-size: 14px; border-bottom: 1px solid #333; padding-bottom: 5px;"><strong>Rendelés adatai:</strong></p>
                            <p style="font-size: 13px; color: #ccc; margin: 5px 0;">Dátum: {{ date('Y. m. d. H:i') }}</p>
                            <p style="font-size: 13px; color: #ccc; margin: 5px 0;">Tranzakcióazonosító: <span style="color: #fff;">#{{ $rendeles->id }}</span></p>
                            <p style="font-size: 13px; color: #ccc; margin: 5px 0;">Fizetési mód: Online bankkártya</p>
                        </td>
                    </tr>

                    <tr>
                        <td class="legal-text">
                            <p>A megrendelésed leadásával elfogadtad, hogy a kiválasztott termékek a raktárkészlet erejéig elérhetőek. A szállítás állapotáról e-mailben fogunk tájékoztatni.</p>
                            <p>Ha bármilyen kérdésed van a vásárlással kapcsolatban, kérjük, keresd ügyfélszolgálatunkat a <a href="mailto:support@sneakershop.hu" style="color: #d32f2f; text-decoration: none;">support@sneakershop.hu</a> címen.</p>
                            <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;">
                            <p style="text-align: center; color: #444;">Köszönjük, hogy minket választottál!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>