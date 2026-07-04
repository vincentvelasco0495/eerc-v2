<?php

namespace App\Services;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EnrollmentSchemaService
{
    private const FORM_DATA_MIGRATION = '2026_06_14_180000_add_form_data_to_enrollments_table';

    private const REJECTION_REASON_MIGRATION = '2026_06_16_140000_add_rejection_reason_to_enrollments_table';

    /**
     * Ensures enrollment wizard columns exist (self-heals when migrate was not run).
     */
    public static function ensureFormDataColumns(): void
    {
        if (! Schema::hasTable('enrollments')) {
            return;
        }

        $changed = false;

        if (! Schema::hasColumn('enrollments', 'form_data')) {
            Schema::table('enrollments', function (Blueprint $table) {
                $table->json('form_data')->nullable();
            });
            $changed = true;
        }

        if (! Schema::hasColumn('enrollments', 'documents')) {
            Schema::table('enrollments', function (Blueprint $table) {
                $table->json('documents')->nullable();
            });
            $changed = true;
        }

        if ($changed) {
            self::recordMigrationIfMissing(self::FORM_DATA_MIGRATION);
        }
    }

    public static function ensureRejectionReasonColumn(): void
    {
        if (! Schema::hasTable('enrollments')) {
            return;
        }

        if (Schema::hasColumn('enrollments', 'rejection_reason')) {
            return;
        }

        Schema::table('enrollments', function (Blueprint $table) {
            $table->text('rejection_reason')->nullable()->after('status');
        });

        self::recordMigrationIfMissing(self::REJECTION_REASON_MIGRATION);
    }

    private static function recordMigrationIfMissing(string $migration): void
    {
        if (! Schema::hasTable('migrations')) {
            return;
        }

        $exists = DB::table('migrations')
            ->where('migration', $migration)
            ->exists();

        if ($exists) {
            return;
        }

        $batch = (int) DB::table('migrations')->max('batch');

        DB::table('migrations')->insert([
            'migration' => $migration,
            'batch' => $batch > 0 ? $batch : 1,
        ]);
    }
}
