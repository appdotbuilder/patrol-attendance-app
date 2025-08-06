<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\PatrolController;
use App\Http\Controllers\PatrolPostController;
use App\Http\Controllers\SecurityOfficerController;
use App\Http\Controllers\WorkScheduleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user->isSecurityOfficer()) {
            return redirect()->route('patrol.index');
        }
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Administrator routes
    Route::resource('security-officers', SecurityOfficerController::class);
    Route::resource('patrol-posts', PatrolPostController::class);
    Route::resource('work-schedules', WorkScheduleController::class);
    
    // Attendance Reports
    Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');
    Route::get('/attendances/{attendance}', [AttendanceController::class, 'show'])->name('attendances.show');
    
    // Security Officer routes
    Route::get('/patrol', [PatrolController::class, 'index'])->name('patrol.index');
    Route::get('/patrol/scanner', [PatrolController::class, 'show'])->name('patrol.scanner');
    Route::post('/attendances', [AttendanceController::class, 'store'])->name('attendances.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
