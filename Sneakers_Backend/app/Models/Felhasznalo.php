<?php

namespace App\Models;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Hash;


class Felhasznalo extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'felhasznalos';

    protected $primaryKey = 'felhasznalo_id';

   
    public $incrementing = true;

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
        'remember_token', 
    ];

    protected $casts = [
        'aktiv' => 'boolean',
        'regisztracio_datuma' => 'datetime',
    ];

    
    public function getAuthPassword()
    {
        return $this->jelszo;
    }

    
    public function setJelszoAttribute($value)
    {
        if (!empty($value)) {
            $this->attributes['jelszo'] = Hash::needsRehash($value) ? Hash::make($value) : $value;
        }
    }

    public function nyelv()
    {
        return $this->belongsTo(Nyelv::class, 'nyelv_id');
    }
}