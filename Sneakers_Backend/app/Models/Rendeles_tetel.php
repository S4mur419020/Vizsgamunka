<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rendeles_tetel extends Model
{
    use HasFactory;

    protected $table = 'rendeles_tetels'; 
    protected $primaryKey = 'rendelestetel_id'; 

    protected $fillable = [
        'rendeles_id',
        'termek_id',
        'meret_id',
        'mennyiseg',
        'egyseg_ar',
        'fizetes_id',
        'telephely_id'
    ];

    public function rendeles()
    {
        return $this->belongsTo(Rendeles::class, 'rendeles_id', 'rendeles_id');
    }

    public function termek()
    {

        return $this->belongsTo(Termekek::class, 'termek_id', 'cikkszam');
    }

    /*public function telephely()
    {
        return $this->belongsTo(Telephely::class, 'telephely_id');
    }*/
}
