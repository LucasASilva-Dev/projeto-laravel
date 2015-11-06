<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 00:21
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ProjectFileValidator extends LaravelValidator
{

    protected $rules = [
        'project_id' => 'required|integer',
        'name' => 'required',
        'description' => 'required',
        'extension' => 'required',
    ];


}