<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $fillable=[
        'cim',
        'tartalom',
        'szerzo_id',
        'publikacio_datuma',
        'nyelv_id',
    ];
}
