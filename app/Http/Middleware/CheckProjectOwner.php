<?php

namespace CodeProject\Http\Middleware;

use Closure;
use CodeProject\Repositories\ProjectRepositories;

class CheckProjectOwner
{


    /**
     * @var ProjectRepositories
     */
    private $repositories;

    public function __construct(ProjectRepositories $repositories){

        $this->repositories = $repositories;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId = \Authorizer::getResourceOwnerId();
        $projectId = $request->project;

        if($this->repositories->isOwner($projectId, $userId) == false){
            return ['error'=>'Access Forbbiden'];
        }

        return $next($request);
    }
}
