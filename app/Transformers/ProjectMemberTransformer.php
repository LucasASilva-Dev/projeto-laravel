<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 13:36
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectMember;
use League\Fractal\TransformerAbstract;

class ProjectMemberTransformer extends TransformerAbstract
{
    protected $defaultIncludes = [
        'user'
    ];

    public function transform(ProjectMember $member)
    {
        return [
            'project_member_id' => $member->id,
            'project_id' => $member->project_id
        ];
    }

    public function includeUser(ProjectMember $member)
    {
        return $this->item($member->member, new MemberTransformer());

    }
}