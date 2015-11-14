<?php

use Illuminate\Database\Seeder;

class OauthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        factory(\CodeProject\Entities\OauthClients::class)->create([
            'id' => 'appclient1',
            'secret' => 'secret',
            'name' => 'appclient1',
        ]);


    }
}
