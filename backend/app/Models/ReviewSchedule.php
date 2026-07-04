<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReviewSchedule extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'public_id',
        'name',
        'description',
        'status',
        'sort_order',
        'enrollment_branch_id',
        'student_capacity',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
            'enrollment_branch_id' => 'integer',
            'student_capacity' => 'integer',
        ];
    }

    public function branchEnroll(): BelongsTo
    {
        return $this->belongsTo(BranchEnroll::class, 'enrollment_branch_id');
    }

    public function getNameAttribute(?string $value): ?string
    {
        if ($value !== null && $value !== '') {
            return $value;
        }

        $label = $this->attributes['label'] ?? null;

        return $label !== null && $label !== '' ? $label : null;
    }
}
