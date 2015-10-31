<?php
/**
 * Created by PhpStorm.
 * User: Lucas
 * Date: 29/10/2015
 * Time: 00:16
 */

namespace CodeProject\Transformers;


use CodeProject\Entities\Client;
use League\Fractal\TransformerAbstract;

class ClientTransformer extends TransformerAbstract
{

    /**
     * @param Client $o
     * @return array
     */
    public function transform(Client $o){
        return [
          'id' => (int)$o->id,
            'name' => $o->name,
            'responsible' => $o->responsible,
            'email' => $o->email,
            'phone' => $o->phone,
            'address' => $o->address,
            'obs' => $o->obs
        ];

    }

}