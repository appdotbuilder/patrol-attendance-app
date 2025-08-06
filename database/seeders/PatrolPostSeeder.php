<?php

namespace Database\Seeders;

use App\Models\PatrolPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PatrolPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            ['name' => 'Main Gate', 'description' => 'Primary entrance gate'],
            ['name' => 'Parking Lot A', 'description' => 'Employee parking area'],
            ['name' => 'Parking Lot B', 'description' => 'Visitor parking area'],
            ['name' => 'Building Entrance', 'description' => 'Main building entrance'],
            ['name' => 'Emergency Exit', 'description' => 'Emergency exit door'],
            ['name' => 'Loading Dock', 'description' => 'Goods loading and unloading area'],
            ['name' => 'Perimeter South', 'description' => 'Southern perimeter checkpoint'],
        ];

        foreach ($posts as $post) {
            PatrolPost::create([
                'name' => $post['name'],
                'description' => $post['description'],
                'qr_code_token' => 'post_' . Str::random(16),
                'status' => 'active',
            ]);
        }
    }
}