<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 26/10/2015
 * Time: 18:49
 */

namespace CodeProject\Services;


use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Repositories\ProjectRepositories;
use CodeProject\Validators\ProjectFileValidator;
use Prettus\Validator\Exceptions\ValidatorException;
use Illuminate\Contracts\Filesystem\Factory as Storage;
use Illuminate\Filesystem\Filesystem;


class ProjectFileService
{
    /**
 * @var ProjectFileRepository
 */
    protected $repository;
    /**
     * @var ProjectRepositories
     */
    protected $projectRepositories;
    /**
     * @var ProjectFileValidator
     */
    protected $validator;
    /**
     * @var Filesystem
     */
    protected $filesystem;
    /**
     * @var Storage
     */
    protected $storage;

    public function __construct(ProjectFileRepository $repository,
                                ProjectRepositories $projectRepositories,
                                ProjectFileValidator $validator,
                                Filesystem $filesystem,
                                Storage $storage)
    {

        $this->repository = $repository;
        $this->projectRepositories = $projectRepositories;
        $this->validator = $validator;
        $this->filesystem = $filesystem;
        $this->storage = $storage;
    }


    public function create(array $data){

        try{
            $this->validator->with($data)->passesOrFail();

            $project = $this->projectRepositories->skipPresenter()->find($data['project_id']);
            $projectFile = $project->files()->create($data);

            $this->storage->put($projectFile->id . ".".$data['extension'], $this->filesystem->get($data['file']));

            return $projectFile;

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
        $projectFile = $this->repository->skipPresenter()->find($id);

        if($this->storage->exists($projectFile->id.'.'.$projectFile->extension)){
            $this->storage->delete($projectFile->id.'.'.$projectFile->extension);
            $projectFile->delete();
        }

    }



    public function getFilePath($id){
        $projectFIle = $this->repository->skipPresenter()->find($id);
        return $this->getBaseURL($projectFIle);
    }



    private function getBaseURL($projectFile){

        switch ($this->storage->getDefaultDriver()){
            case 'local':
                return $this->storage->getDriver()->getAdapter()->getPathPrefix().
                '/'.$projectFile->id . '.'.$projectFile->extension;
        }

    }

    public function checkProjectOwner($projectFileId){
        $userId = \Authorizer::getResourceOwnerId();

        $projectId = $this->repository->skipPresenter()->find($projectFileId)->project_id;

        return $this->projectRepositories->isOwner($projectId, $userId);
    }

    public function checkProjectMember($projectFileId){

        $userId = \Authorizer::getResourceOwnerId();

        $projectId = $this->repository->skipPresenter()->find($projectFileId)->project_id;

        return $this->projectRepositories->hasMember($projectId, $userId);
    }


    public function checkProjectPermissions($projectFileId){

        if( $this->checkProjectOwner($projectFileId) or $this->checkProjectMember($projectFileId)){
            return true;
        };

        return false;
    }


}