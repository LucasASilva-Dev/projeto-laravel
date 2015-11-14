<?php
namespace Prettus\Repository\Contracts;

/**
 * Interface CriteriaInterface
 * @package Prettus\Repositories\Contracts
 */
interface CriteriaInterface
{
    /**
     * Apply criteria in query repository
     *
     * @param $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository);

}