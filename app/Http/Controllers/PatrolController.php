<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PatrolPost;
use Inertia\Inertia;

class PatrolController extends Controller
{
    /**
     * Show the patrol dashboard for security officers.
     */
    public function index()
    {
        $posts = PatrolPost::active()->get();
        $userAttendances = auth()->user()->attendances()
            ->with('patrolPost')
            ->whereDate('scanned_at', today())
            ->latest()
            ->get();
        
        return Inertia::render('patrol/index', [
            'posts' => $posts,
            'todayAttendances' => $userAttendances
        ]);
    }

    /**
     * Show the QR code scanner page.
     */
    public function show()
    {
        return Inertia::render('patrol/scanner');
    }
}