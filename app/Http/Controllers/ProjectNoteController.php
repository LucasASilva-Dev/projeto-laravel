<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectNoteRepositories;
use CodeProject\Services\ProjectNoteService;
use Illuminate\Http\Request;

class ProjectNoteController extends Controller
{
    /*
     * @var ProjectNoteRepository
     */
    private $repository;
    /**
     * @var ProjectNoteService
     */
    private $service;

    public function __construct(ProjectNoteRepositories $repository, ProjectNoteService $service){

        $this->repository = $repository;
        $this->service = $service;
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->service->create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, $note_id)
    {
        $result =  $this->repository->findWhere(['project_id' => $id, 'id' => $note_id]);
        if(isset($result['data']) && count($result['data']) == 1 ){
            $result = [
                'data' => $result['data'][0]
            ];
        }
        return $result;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $noteId)
    {
       return $this->service->update($request->all(), $noteId);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy( $noteId )
    {
        $this->repository->delete($noteId);
    }
}
