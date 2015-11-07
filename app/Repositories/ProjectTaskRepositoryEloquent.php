<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 26/10/2015
 * Time: 16:53
 */

namespace CodeProject\Repositories;


use CodeProject\Entities\ProjectTask;
use CodeProject\Presenters\ProjectTaskPresenter;
use Prettus\Repository\Eloquent\BaseRepository;

class ProjectTaskRepositoryEloquent extends BaseRepository implements ProjectTaskRepository
{

    public function model()
    {

        return ProjectTask::class;
    }

    public function presenter(){

        return ProjectTaskPresenter::class;

    }

    public function boot(){
        $this->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
    }

}