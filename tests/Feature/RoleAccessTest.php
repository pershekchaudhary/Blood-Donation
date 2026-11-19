<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_is_sent_to_login(): void
    {
        $this->get('/donor/dashboard')->assertRedirect(route('login'));
        $this->get('/dashboard')->assertRedirect(route('login'));
    }

    public function test_dashboard_redirects_each_role_to_its_own_page(): void
    {
        foreach (['donor', 'requester', 'hospital', 'admin'] as $role) {
            $user = User::factory()->create(['role' => $role]);

            $this->actingAs($user)->get('/dashboard')->assertRedirect(route("$role.dashboard"));
        }
    }

    public function test_user_cannot_open_another_roles_pages(): void
    {
        $donor = User::factory()->create(['role' => 'donor']);

        $this->actingAs($donor)->get('/admin/dashboard')->assertRedirect(route('dashboard'));
        $this->actingAs($donor)->get('/hospital/dashboard')->assertRedirect(route('dashboard'));
        $this->actingAs($donor)->get('/donor/dashboard')->assertOk();
    }
}
