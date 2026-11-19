<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $override = []): array
    {
        return array_merge([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '9800000001',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'donor',
            'blood_group' => 'O+',
            'city' => 'Itahari',
        ], $override);
    }

    public function test_registration_screen_can_be_rendered(): void
    {
        $this->get('/register')->assertStatus(200);
    }

    public function test_donor_can_register_and_is_sent_to_dashboard(): void
    {
        Notification::fake();

        $response = $this->post('/register', $this->payload());

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));

        $user = User::where('email', 'test@example.com')->firstOrFail();

        $this->assertSame(User::ROLE_DONOR, $user->role);
        $this->assertSame('O+', $user->blood_group);
        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_hospital_starts_unverified(): void
    {
        $this->post('/register', $this->payload(['role' => 'hospital', 'blood_group' => null]));

        $this->assertFalse(User::where('email', 'test@example.com')->first()->is_verified);
    }

    public function test_admin_role_cannot_be_self_registered(): void
    {
        $this->post('/register', $this->payload(['role' => 'admin']))->assertSessionHasErrors('role');
        $this->assertGuest();
    }

    public function test_donor_must_give_blood_group(): void
    {
        $this->post('/register', $this->payload(['blood_group' => null]))->assertSessionHasErrors('blood_group');
    }
}
