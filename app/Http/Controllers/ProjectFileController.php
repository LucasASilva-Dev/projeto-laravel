<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Services\ProjectFileService;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Http\Request;

class ProjectFileController extends Controller
{
    /*
     * @var ProjectRepository
     */
    private $repository;
    /**
     * @var ProjectFileService
     */
    private $service;

    /**
     * @var \Illuminate\Contracts\Filesystem\Factory
     */
    private $storage;

    public function __construct(ProjectFileRepository $repository, ProjectFileService $service,
Factory $storage){

        $this->repository = $repository;
        $this->service = $service;
        $this->storage = $storage;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        $data['file'] =  $file;
        $data['extension'] =  $extension;
        $data['name'] = $request->name;
        $data['project_id'] = $id;
        $data['description'] = $request->description;

        return $this->service->create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showFile($id, $idFile)
    {
        $model = $this->repository->skipPresenter()->find($idFile);
        $filePath = $this->service->getFilePath($idFile);
        $fileContent = file_get_contents($filePath);
        $file64 = base64_encode($fileContent);

        return [
            'file' => $file64,
            'size' => filesize($filePath),
            'name' => $this->service->getFileName($idFile),
            'mime_type' => $this->storage->mimeType($model->getFileName())
        ];
    }

    /**
     * @param $id
     * @return array|\Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function show($id,$idFile)
    {

        return $this->repository->find($idFile);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id,  $idFile)
    {
        $data = $request->all();
        $data['project_id'] = $id;

       return $this->service->update($data, $idFile);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id,$idFile)
    {
        $this->repository->delete($idFile);
    }

}
