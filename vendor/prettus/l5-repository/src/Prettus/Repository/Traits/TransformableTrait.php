<?php namespace Prettus\Repository\Traits;

/**
 * Class TransformableTrait
 * @package Prettus\Repositories\Traits
 */
trait TransformableTrait {

    /**
     * @return array
     */
    public function transform()
    {
        return $this->toArray();
    }

}