<?php
namespace Prettus\Repository\Events;

/**
 * Class RepositoryEntityDeleted
 * @package Prettus\Repositories\Events
 */
class RepositoryEntityDeleted extends RepositoryEventBase
{
    /**
     * @var string
     */
    protected $action = "deleted";
}