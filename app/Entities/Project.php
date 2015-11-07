<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Project extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'owner_id',
        'client_id',
        'name',
        'description',
        'progress',
        'status',
        'due_date'
    ];

    public function client(){
     return new Client();
    }

    public function notes(){
        //One to many
        return $this->hasMany(ProjectNote::class);
    }

    public function members(){
        //Many to Many
        return $this->belongsToMany(User::class, 'project_members', 'project_id', 'member_id');
    }

    public function files(){
        //One to Many
        return $this->hasMany(ProjectFile::class);
    }

    public function tasks(){
        //One to many
        return $this->hasMany(ProjectTask::class);
    }

}
