<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    public const STATUS_PENDING = 'pending';

    public const STATUS_APPROVED = 'approved';

    public const STATUS_REJECTED = 'rejected';

    public const STATUS_HOLD = 'hold';

    protected $fillable = [
        'public_id',
        'user_id',
        'program_id',
        'course_id',
        'status',
        'rejection_reason',
        'submitted_at',
        'payment_proof_path',
        'payment_proof_original_name',
        'payment_proof_mime',
        'form_data',
        'documents',
    ];

    protected function casts(): array
    {
        return [
            'submitted_at' => 'date',
            'form_data' => 'array',
            'documents' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public static function grantsCourseAccess(?string $status): bool
    {
        return strtolower(trim((string) $status)) === self::STATUS_APPROVED;
    }

    /**
     * @param  Builder<Enrollment>  $query
     * @return Builder<Enrollment>
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_APPROVED);
    }
}
