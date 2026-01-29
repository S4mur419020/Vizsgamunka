<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Termek_valtozatok extends Model
{
    /** @use HasFactory<\Database\Factories\TermekValtozatokFactory> */
    use HasFactory;
    protected $table = 'termek_valtozatoks';

    protected $fillable = [
        'termek_id',
        'nev',
        'elerheto',
    ];

    public function termek()
    {
        return $this->belongsTo(Termekek::class, 'termek_id','cikkszam');
    }
}
