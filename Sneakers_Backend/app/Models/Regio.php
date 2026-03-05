<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regio extends Model
{
    /** @use HasFactory<\Database\Factories\RegioFactory> */
    use HasFactory;

    protected $primaryKey = 'szabvany'; 
    public $incrementing = false;       
    protected $keyType = 'string';      

    protected $fillable = [
        'szabvany', 
        'nev'
    ];
}
