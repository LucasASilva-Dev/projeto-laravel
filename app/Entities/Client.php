<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'responsible',
        'email',
        'phone',
        'address',
        'obs'
    ];

    protected $dates = ['deleted_at'];

    public function project(){
        //One to Many
        return $this->hasMany(Project::class);

    }
}
