<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #0f0f0f;
            color: #ffffff;
        }

        .item-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .item-table th {
            color: #888;
            font-size: 12px;
            text-transform: uppercase;
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #333;
        }

        .item-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #222;
            font-size: 14px;
        }

        .total-section {
            text-align: right;
            padding: 20px;
            background-color: #1a1a1a;
            border-radius: 4px;
        }

        .highlight {
            color: #d32f2f;
            font-weight: bold;
        }

        .discount-text {
            color: #4caf50;
            font-weight: bold;
            font-size: 14px;
        }

        .original-price {
            text-decoration: line-through;
            color: #666;
            font-size: 14px;
            margin-left: 10px;
        }

        .legal-text {
            color: #666;
            font-size: 12px;
            line-height: 1.5;
            margin-top: 30px;
        }
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
                                        <th>Termék</th>
                                        <th style="text-align: right;">Ár</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php $subTotal = 0; @endphp
                                    @foreach($tetelek as $tetel)
                                    @php
                                    $itemPrice = $tetel['ar'] ?? ($tetel['termek']['ar'] ?? 0);
                                    $subTotal += ($itemPrice * $tetel['mennyiseg']);
                                    @endphp
                                    <tr>
                                        <td>{{ $tetel['mennyiseg'] }} db</td>
                                        <td>{{ $tetel['nev'] ?? ($tetel['termek']['nev'] ?? 'Termék') }}</td>
                                        <td style="text-align: right;">{{ number_format($itemPrice, 0, ',', ' ') }} Ft</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="total-section">
                            @if($subTotal > ($rendeles->osszeg + 10))
                            <div style="margin-bottom: 5px;">
                                <span style="color: #888;">Eredeti részösszeg:</span>
                                <span class="original-price">{{ number_format($subTotal, 0, ',', ' ') }} Ft</span>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <span class="discount-text">-10% Kedvezmény felhasználva</span>
                            </div>
                            @endif
                            <span style="color: #888; margin-right: 20px;">Végösszeg:</span>
                            <span style="font-size: 24px; font-weight: bold; color: #ffffff;">{{ number_format($rendeles->osszeg, 0, ',', ' ') }} Ft</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 30px;">
                            <p style="font-size: 14px; border-bottom: 1px solid #333; padding-bottom: 5px;"><strong>Rendelés adatai:</strong></p>
                            <p style="font-size: 13px; color: #ccc; margin: 5px 0;">Dátum: {{ $rendeles->created_at->format('Y. m. d. H:i') }}</p>
                            <p style="font-size: 13px; color: #ccc; margin: 5px 0;">Tranzakcióazonosító: <span style="color: #fff;">#{{ $rendeles->id }}</span></p>
                            <p style="font-size: 13px; color: #ccc; margin: 5px 0;">Fizetési mód:
                                <span style="color: #fff; font-weight: bold;">
                                    {{ $rendeles->fizetesi_mod ?? 'Nincs megadva' }}
                                </span>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="legal-text">
                            <p>A szállítás állapotáról e-mailben fogunk tájékoztatni.</p>
                            <p>Ügyfélszolgálat: <a href="mailto:support@sneakershop.hu" style="color: #d32f2f; text-decoration: none;">support@sneakershop.hu</a></p>
                            <p style="text-align: center; color: #444; margin-top: 20px;">Köszönjük, hogy minket választottál!</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>