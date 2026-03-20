<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rendeles extends Model
{
    /** @use HasFactory<\Database\Factories\RendelesFactory> */
    use HasFactory;

    protected $table = 'rendeles'; 
    protected $primaryKey = 'rendeles_id'; 

    protected $fillable = [
        'felhasznalo_id',
        'fizetes_id',    
        'osszeg',        
        'allapot',      
        'datum',         
        'szallitasi_cim_id' 
    ];

    public function tetel()
    {
        return $this->hasMany(Rendeles_tetel::class, 'rendeles_id', 'rendeles_id');
    }

    public function felhasznalo()
    {
        return $this->belongsTo(Felhasznalo::class, 'felhasznalo_id', 'felhasznalo_id');
    }


    public function szallitasiCim()
    {
        return $this->belongsTo(Szallitasi_cim::class, 'szallitasi_cim_id');
    }
}
