<?php namespace Prettus\Repository\Transformer;

use League\Fractal\TransformerAbstract;
use Prettus\Repository\Contracts\Transformable;

/**
 * Class ModelTransformer
 * @package Prettus\Repositories\Transformer
 */
class ModelTransformer extends TransformerAbstract
{
    public function transform(Transformable $model)
    {
        return $model->transform();
    }
}