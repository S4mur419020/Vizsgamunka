<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Szekhely extends Model
{
    /** @use HasFactory<\Database\Factories\SzekhelyFactory> */
    use HasFactory;

    protected $table = 'szekhelies';

    protected $fillable = [
        'id',
        'nev',
        'cim',
        'orszag',
        'varos',
        'iranyitoszam',
        'email', 
        'telefon', 
        'kep_url', 
        'nyitvatartas'
    ];

    public function telephelyek()
    {
        return $this->hasMany(Telephely::class, 'szekhely_id');
    }
}
