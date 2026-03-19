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
        'role_id',
        'aktiv',
        'salutation',
        'first_name',
        'last_name',
        'alias',
        'birth_day',
        'birth_month',
        'birth_year',
        'profile_image',
    ];

    protected $hidden = [
        'jelszo',
        'remember_token', 
    ];

    protected $casts = [
        'aktiv' => 'boolean',
        'regisztracio_datuma' => 'datetime',
        'birth_day' => 'integer',
        'birth_month' => 'integer',
        'birth_year' => 'integer',
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

    public function getAttribute($key)
    {
        if ($key === 'password') {
            return $this->jelszo;
        }
        return parent::getAttribute($key);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}