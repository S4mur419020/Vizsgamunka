<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Felhasznalo extends Model
{
    /** @use HasFactory<\Database\Factories\FelhasznaloFactory> */
    use HasFactory;


    protected $table = 'felhasznalos';

    protected $primaryKey = 'felhasznalo_id';

    protected $fillable = [
    'nev',
    'email',
    'jelszo',
    'telefonszam',
    'regisztracio_datuma', 
    'nyelv_id',
    'szekhely_id',
    'aktiv',
];

    protected $hidden = [
        'jelszo',
    ];

    protected $casts = [
        'aktiv' => 'boolean',
        'created_at' => 'datetime',
    ];

    
    public function setJelszoAttribute($value)
    {
        $this->attributes['jelszo'] = Hash::make($value);
    }

    
    public function nyelv()
    {
        return $this->belongsTo(Nyelv::class, 'nyelv_id');
    }
}
