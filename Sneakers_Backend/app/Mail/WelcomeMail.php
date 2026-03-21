<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $felhasznalo;

    public function __construct($felhasznalo)
    {
        $this->felhasznalo = $felhasznalo;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Üdvözöljük a Sneaker Webshopban!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome', 
        );
    }
}