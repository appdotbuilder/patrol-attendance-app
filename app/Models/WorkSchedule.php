<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WorkSchedule
 *
 * @property int $id
 * @property int $user_id
 * @property string $date
 * @property string $type
 * @property string|null $start_time
 * @property string|null $end_time
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereUserId($value)
 * @method static \Database\Factories\WorkScheduleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WorkSchedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'date',
        'type',
        'start_time',
        'end_time',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user associated with this schedule.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}