<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => auth()->check()
    ? redirect()->route('dashboard')
    : redirect()->route('login'));

// After login / register everyone lands here and is sent to the page for their role.
Route::get('/dashboard', fn (Request $request) => redirect()->route($request->user()->homeRoute()))
    ->middleware('auth')
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', RoleMiddleware::class . ':donor'])
    ->prefix('donor')->name('donor.')->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('Donor/Dashboard'))->name('dashboard');
    });

Route::middleware(['auth', RoleMiddleware::class . ':requester'])
    ->prefix('requester')->name('requester.')->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('Requester/Dashboard'))->name('dashboard');
    });

Route::middleware(['auth', RoleMiddleware::class . ':hospital'])
    ->prefix('hospital')->name('hospital.')->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('Hospital/Dashboard'))->name('dashboard');
    });

Route::middleware(['auth', RoleMiddleware::class . ':admin'])
    ->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'))->name('dashboard');
    });

require __DIR__ . '/auth.php';
