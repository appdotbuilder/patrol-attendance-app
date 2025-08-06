<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceRequest;
use App\Models\Attendance;
use App\Models\PatrolPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Attendance::with('user', 'patrolPost')
            ->latest('scanned_at');

        if ($request->has('officer') && $request->officer) {
            $query->where('user_id', $request->officer);
        }

        if ($request->has('post') && $request->post) {
            $query->where('patrol_post_id', $request->post);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('scanned_at', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('scanned_at', '<=', $request->date_to);
        }

        $attendances = $query->paginate(20);
        
        return Inertia::render('attendances/index', [
            'attendances' => $attendances,
            'filters' => $request->only(['officer', 'post', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        $post = PatrolPost::where('qr_code_token', $request->qr_code_token)->firstOrFail();
        
        $attendance = Attendance::create([
            'user_id' => auth()->id(),
            'patrol_post_id' => $post->id,
            'scanned_at' => now(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'patrol_status' => 'on_patrol',
            'notes' => $request->notes,
        ]);

        return Inertia::render('patrol/scan-success', [
            'attendance' => $attendance->load('patrolPost'),
            'post' => $post,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        $attendance->load('user', 'patrolPost');
        
        return Inertia::render('attendances/show', [
            'attendance' => $attendance
        ]);
    }
}