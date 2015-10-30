<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 13:36
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\Project;
use CodeProject\Entities\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    public function transform(User $o)
    {

        return [
            'name' => $o->name,
            'email' => $o->email,
            'created_at' => $o->created_at,
            'updated_at' => $o->updated_at,
        ];

    }
}