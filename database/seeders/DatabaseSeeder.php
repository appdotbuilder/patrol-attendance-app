<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PatrolPostSeeder::class,
        ]);

        // Create admin user
        $adminRole = \App\Models\Role::where('name', 'administrator')->first();
        \App\Models\User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@attendance.com',
            'role_id' => $adminRole->id,
            'employee_id' => 'ADM001',
            'qr_code_token' => 'admin_' . \Illuminate\Support\Str::random(16),
        ]);

        // Create security officers
        $securityRole = \App\Models\Role::where('name', 'security_officer')->first();
        for ($i = 1; $i <= 3; $i++) {
            \App\Models\User::factory()->create([
                'name' => "Security Officer {$i}",
                'email' => "officer{$i}@attendance.com",
                'role_id' => $securityRole->id,
                'employee_id' => "SEC00{$i}",
                'qr_code_token' => 'officer_' . \Illuminate\Support\Str::random(16),
            ]);
        }
    }
}
