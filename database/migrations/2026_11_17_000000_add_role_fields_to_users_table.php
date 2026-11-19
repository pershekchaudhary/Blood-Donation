<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('email');
            $table->string('role', 20)->default('requester')->after('password')->index();
            $table->string('blood_group', 3)->nullable();
            $table->string('city', 100)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_available')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'role', 'blood_group', 'city', 'is_verified', 'is_available']);
        });
    }
};
