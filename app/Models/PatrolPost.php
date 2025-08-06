<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\PatrolPost
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $qr_code_token
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Attendance> $attendances
 * @property-read int|null $attendances_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost query()
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost active()
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereQrCodeToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PatrolPost whereUpdatedAt($value)
 * @method static \Database\Factories\PatrolPostFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class PatrolPost extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'qr_code_token',
        'latitude',
        'longitude',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get all attendances for this post.
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}