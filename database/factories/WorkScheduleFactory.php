<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\WorkSchedule;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkSchedule>
 */
class WorkScheduleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\WorkSchedule>
     */
    protected $model = WorkSchedule::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'date' => fake()->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            'type' => fake()->randomElement(['working', 'holiday']),
            'start_time' => fake()->time('H:i'),
            'end_time' => fake()->time('H:i'),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}