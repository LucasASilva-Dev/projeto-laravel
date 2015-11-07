<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 26/10/2015
 * Time: 18:49
 */

namespace CodeProject\Services;


use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Validators\ProjectMemberValidator;
use Prettus\Validator\Exceptions\ValidatorException;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Contracts\Filesystem\Factory as Storage;


class ProjectMemberService
{
    /**
     * @var ProjectMemberRepository
     */
    protected $repository;

    /**
     * @var ProjectMemberValidator
     */
    protected $validator;


    public function __construct(ProjectMemberRepository $repository, ProjectMemberValidator $validator){
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

    public function delete($id){
        $projectMember = $this->repository->skipPresenter()->find($id);
        return $projectMember->delete();
    }


}