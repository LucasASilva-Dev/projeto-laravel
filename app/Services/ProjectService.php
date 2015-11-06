<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 26/10/2015
 * Time: 18:49
 */

namespace CodeProject\Services;


use CodeProject\Repositories\ProjectRepositories;
use CodeProject\Validators\ProjectValidator;
use Prettus\Validator\Exceptions\ValidatorException;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Filesystem\Factory as Storage;


class ProjectService
{
    /**
     * @var ProjectRepositories
     */
    protected $repository;
    /**
     * @var ProjectValidator
     */
    protected $validator;


    public function __construct(ProjectRepositories $repository, ProjectValidator $validator){
        $this->repository = $repository;
        $this->validator = $validator;
    }


    public function create(array $data){

        try{
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
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

    public function checkProjectOwner($projectId){

        $userId = \Authorizer::getResourceOwnerId();
        return $this->repository->isOwner($projectId, $userId);

    }

    public function checkProjectMember($projectId){

        $userId = \Authorizer::getResourceOwnerId();
        return $this->repository->hasMember($projectId, $userId);

    }

    public function checkProjectPermissions($projectId){
        if( $this->checkProjectOwner($projectId) or $this->checkProjectMember($projectId)){
            return true;
        };

        return false;
    }

}