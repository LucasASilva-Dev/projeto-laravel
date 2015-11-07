<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 13:36
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectTask;
use League\Fractal\TransformerAbstract;

class ProjectTaskTransformer extends TransformerAbstract
{
    public function transform(ProjectTask $o)
    {

        return [
            'id' => $o->id,
            'project_id' => $o->project_id,
            'name' => $o->name,
            'start_date' => $o->start_date,
            'due_date' => $o->due_date,
            'status' => $o->status
        ];

    }

}