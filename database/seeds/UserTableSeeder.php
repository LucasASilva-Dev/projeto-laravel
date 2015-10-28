<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //CodeProject\Entities\User::truncate();
        factory(\CodeProject\Entities\User::class)->create([
            'name' => 'Lucas Antonio',
            'email' => 'lucas.bialar@gmail.com',
            'password' => bcrypt('wtn335'),
            'remember_token' => str_random(10),
        ]);

        factory(\CodeProject\Entities\User::class, 10)->create();

    }
}
