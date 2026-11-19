<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Usage: RoleMiddleware::class.':donor' or ':donor,hospital'
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return redirect()->route('login');
        }

        if (! $user->hasRole(...$roles)) {
            return redirect()
                ->route('dashboard')
                ->with('error', 'You do not have access to that page.');
        }

        return $next($request);
    }
}
