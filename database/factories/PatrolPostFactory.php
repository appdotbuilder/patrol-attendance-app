<?php

namespace Database\Factories;

use App\Models\PatrolPost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PatrolPost>
 */
class PatrolPostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\PatrolPost>
     */
    protected $model = PatrolPost::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Main Gate',
                'Parking Lot A',
                'Parking Lot B',
                'Building Entrance',
                'Emergency Exit',
                'Loading Dock',
                'Perimeter North',
                'Perimeter South'
            ]),
            'description' => fake()->sentence(),
            'qr_code_token' => 'post_' . Str::random(16),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}