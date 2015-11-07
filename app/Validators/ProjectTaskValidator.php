<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 27/10/2015
 * Time: 00:21
 */

namespace CodeProject\Validators;


use Prettus\Validator\LaravelValidator;

class ProjectTaskValidator extends LaravelValidator
{

    protected $rules = [
        'name' => 'required|max:255',
    ];


}