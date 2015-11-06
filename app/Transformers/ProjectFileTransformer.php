<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 13:36
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectFile;
use League\Fractal\TransformerAbstract;

class ProjectFileTransformer extends TransformerAbstract
{
    public function transform(ProjectFile $o)
    {

        return [
            'id' => $o->id,
            'name' => $o->name,
            'extension' => $o->extension,
            'description' => $o->description
        ];

    }

}