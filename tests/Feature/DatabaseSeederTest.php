<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use RuntimeException;
use Tests\TestCase;

class DatabaseSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_seed_requires_a_configured_strong_password(): void
    {
        config([
            'app.admin_seed_email' => 'admin@sbders.test',
            'app.admin_seed_password' => null,
        ]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Set ADMIN_SEED_PASSWORD');

        (new DatabaseSeeder)->run();
    }

    public function test_admin_seed_creates_an_admin_without_rotating_existing_credentials(): void
    {
        config([
            'app.admin_seed_email' => 'admin@sbders.test',
            'app.admin_seed_password' => 'Unique-admin-password-2026',
        ]);

        $seeder = new DatabaseSeeder;
        $seeder->run();

        $admin = User::where('email', 'admin@sbders.test')->firstOrFail();

        $this->assertSame(User::ROLE_ADMIN, $admin->role);
        $this->assertTrue(password_verify('Unique-admin-password-2026', $admin->password));

        config(['app.admin_seed_password' => 'Another-unique-password-2026']);
        $seeder->run();

        $this->assertTrue(password_verify('Unique-admin-password-2026', $admin->fresh()->password));
    }
}
