<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Learazas extends Model
{
    use HasFactory;
    protected $table = 'learazas';
    protected $primaryKey = 'akcio';
    protected $fillable = [
        'marka',
        'tipus',
        'akcio_szazalek',
        'aktiv',
        'kezdo_datum',
        'zaro_datum'
    ];
}
