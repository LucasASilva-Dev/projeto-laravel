<?php
namespace Prettus\Repository\Events;

/**
 * Class RepositoryEntityCreated
 * @package Prettus\Repositories\Events
 */
class RepositoryEntityCreated extends RepositoryEventBase
{
    /**
     * @var string
     */
    protected $action = "created";
}