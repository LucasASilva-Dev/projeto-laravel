<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 13:36
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectNote;
use League\Fractal\TransformerAbstract;

class ProjectNoteTransformer extends TransformerAbstract
{
    public function transform(ProjectNote $o)
    {

        return [
            'id' => $o->id,
            'project_id' => $o->project_id,
            'title' => $o->title,
            'note' => $o->note
        ];

    }

}