<?php
namespace Prettus\Repository\Contracts;

/**
 * Interface Transformable
 * @package Prettus\Repositories\Contracts
 */
interface Transformable
{
    /**
     * @return array
     */
    public function transform();
}