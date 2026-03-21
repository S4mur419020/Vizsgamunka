<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $rendeles;
    public $tetelek;

    public function __construct($rendeles, $tetelek)
    {
        $this->rendeles = $rendeles;
        $this->tetelek = $tetelek;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Sikeres vásárlás - Rendelési szám: #' . $this->rendeles->id,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.order_confirmation',
        );
    }
}