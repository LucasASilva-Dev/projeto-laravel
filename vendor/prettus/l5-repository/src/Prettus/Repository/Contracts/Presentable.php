<?php
namespace Prettus\Repository\Contracts;

/**
 * Interface Presentable
 * @package Prettus\Repositories\Contracts
 */
interface Presentable
{
    /**
     * @param PresenterInterface $presenter
     * @return mixed
     */
    public function setPresenter(PresenterInterface $presenter);

    /**
     * @return mixed
     */
    public function presenter();
}