<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 26/10/2015
 * Time: 18:49
 */

namespace CodeProject\Services;

use CodeProject\Repositories\ProjectRepositories;
use CodeProject\Repositories\ProjectTaskRepository;
use CodeProject\Validators\ProjectTaskValidator;
use Prettus\Validator\Exceptions\ValidatorException;


class ProjectTaskService
{
    /**
     * @var ProjectTaskRepository
     */
    protected $repository;
    /**
     * @var ProjectTaskValidator
     */
    protected $validator;
    /**
     * @var ProjectRepositories
     */
    private $projectRepositories;
    /**
     * @param ProjectRepositories $projectRepositories
     * @param ProjectTaskRepository $repository
     * @param ProjectTaskValidator $validator
     */
    public function __construct(ProjectRepositories $projectRepositories,
                                ProjectTaskRepository $repository,
                                ProjectTaskValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
        $this->projectRepositories = $projectRepositories;
    }


    public function create(array $data){

        try{
            $this->validator->with($data)->passesOrFail();
            $project =$this->projectRepositories->skipPresenter()->find($data['project_id']);
            $projectTask = $project->tasks()->create($data);
            return $projectTask;

        } catch(ValidatorException $e){

            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }
    }

    public function update(array $data, $id){

        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $id);
        } catch(ValidatorException $e){
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        }
    }

    public function delete($id){
        $projectTask = $this->repository->skipPresenter()->find($id);
        return $projectTask->delete();
    }

}