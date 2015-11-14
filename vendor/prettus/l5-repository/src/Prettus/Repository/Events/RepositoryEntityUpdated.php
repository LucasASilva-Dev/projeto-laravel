<?php
namespace Prettus\Repository\Events;

/**
 * Class RepositoryEntityUpdated
 * @package Prettus\Repositories\Events
 */
class RepositoryEntityUpdated extends RepositoryEventBase
{
    /**
     * @var string
     */
    protected $action = "updated";
}