<?php

namespace App\Providers;

use App\Services\EnrollmentSchemaService;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        try {
            if (Schema::hasTable('enrollments')) {
                EnrollmentSchemaService::ensureFormDataColumns();
            }
        } catch (\Throwable) {
            // Database may be unavailable during install/CI; migrate or next request will heal schema.
        }
    }
}
