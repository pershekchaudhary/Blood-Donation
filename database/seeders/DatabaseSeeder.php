<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('app.admin_seed_email');

        if (! is_string($email) || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new RuntimeException('Set ADMIN_SEED_EMAIL to a valid email address before seeding.');
        }

        $existingAdmin = User::where('email', $email)->first();

        if ($existingAdmin) {
            if (! $existingAdmin->hasRole(User::ROLE_ADMIN)) {
                throw new RuntimeException('The configured admin email already belongs to a non-admin user.');
            }

            return;
        }

        $password = config('app.admin_seed_password');

        if (! is_string($password) || strlen($password) < 12) {
            throw new RuntimeException('Set ADMIN_SEED_PASSWORD to a unique password of at least 12 characters before seeding.');
        }

        User::create([
            'name' => 'Administrator',
            'email' => $email,
            'phone' => null,
            'password' => $password,
            'role' => User::ROLE_ADMIN,
            'city' => null,
            'is_verified' => true,
        ]);
    }
}
