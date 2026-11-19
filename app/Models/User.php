<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    public const ROLE_DONOR = 'donor';

    public const ROLE_REQUESTER = 'requester';

    public const ROLE_HOSPITAL = 'hospital';

    public const ROLE_ADMIN = 'admin';

    /** Roles a person may pick on the sign-up page (admin is never self-registered). */
    public const SELF_REGISTER_ROLES = [self::ROLE_DONOR, self::ROLE_REQUESTER, self::ROLE_HOSPITAL];

    public const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    protected $fillable = [
        'name', 'email', 'phone', 'password', 'role',
        'blood_group', 'city', 'is_verified', 'is_available',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_verified' => 'boolean',
            'is_available' => 'boolean',
        ];
    }

    public function hasRole(string ...$roles): bool
    {
        return in_array($this->role, $roles, true);
    }

    /** Route name of this user's own dashboard. */
    public function homeRoute(): string
    {
        return match ($this->role) {
            self::ROLE_ADMIN => 'admin.dashboard',
            self::ROLE_DONOR => 'donor.dashboard',
            self::ROLE_HOSPITAL => 'hospital.dashboard',
            default => 'requester.dashboard',
        };
    }
}
