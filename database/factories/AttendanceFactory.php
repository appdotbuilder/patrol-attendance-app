<?php

namespace Database\Factories;

use App\Models\Attendance;
use App\Models\PatrolPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Attendance>
     */
    protected $model = Attendance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'patrol_post_id' => PatrolPost::factory(),
            'scanned_at' => fake()->dateTimeBetween('-7 days', 'now'),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'patrol_status' => fake()->randomElement(['on_patrol', 'completed', 'incomplete']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}