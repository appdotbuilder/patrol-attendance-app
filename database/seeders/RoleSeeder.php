<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => 'administrator',
            'display_name' => 'Administrator',
            'description' => 'Can manage security officers, patrol posts, schedules, and view reports',
        ]);

        Role::create([
            'name' => 'security_officer',
            'display_name' => 'Security Officer',
            'description' => 'Can perform patrol attendance by scanning QR codes at designated posts',
        ]);
    }
}