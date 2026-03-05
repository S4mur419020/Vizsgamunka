<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Szallitasi_cim extends Model
{
    /** @use HasFactory<\Database\Factories\SzallitasiCimFactory> */
    use HasFactory;

    protected $table = 'szallitasi_cims';
    protected $primaryKey = 'szallitasi_cim_id';

    protected $fillable = [
        'felhasznalo_id',
        'orszag',
        'iranyitoszam',
        'varos',
        'utca_szam',
        'ceg',          
        'telefonszam',  
        'megjegyzes'
    ];

    public function felhasznalo()
    {
        return $this->belongsTo(User::class, 'felhasznalo_id', 'id');
    }
}