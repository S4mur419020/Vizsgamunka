<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #0f0f0f; color: #ffffff; font-family: Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f0f0f; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a1a1a; border-radius: 8px; border: 1px solid #333;">
                    <tr>
                        <td align="center" style="padding: 20px; background-color: #000;">
                            <h1 style="color: #d32f2f; margin: 0; text-transform: uppercase;">Sneaker Shop</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px; text-align: center;">
                            {{-- Címsor --}}
                            @if (! empty($greeting))
                                <h2 style="color: #fff;">{{ $greeting }}</h2>
                            @endif

                            {{-- Szöveges üzenet sorai --}}
                            @foreach ($introLines as $line)
                                <p style="color: #ccc; line-height: 1.6;">{{ $line }}</p>
                            @endforeach

                            {{-- A Gomb (Reset Password) --}}
                            @if (! empty($actionText))
                                <table border="0" cellspacing="0" cellpadding="0" style="margin: 30px auto;">
                                    <tr>
                                        <td align="center" bgcolor="#d32f2f" style="border-radius: 4px;">
                                            <a href="{{ $actionUrl }}" target="_blank" style="padding: 15px 30px; color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block;">
                                                {{ $actionText }}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            @endif

                            {{-- További sorok --}}
                            @foreach ($outroLines as $line)
                                <p style="color: #888; font-size: 14px;">{{ $line }}</p>
                            @endforeach
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>