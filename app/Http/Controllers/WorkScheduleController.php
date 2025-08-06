<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkScheduleRequest;
use App\Http\Requests\UpdateWorkScheduleRequest;
use App\Models\User;
use App\Models\WorkSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = WorkSchedule::with('user')
            ->latest('date');

        if ($request->has('officer') && $request->officer) {
            $query->where('user_id', $request->officer);
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('date', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('date', '<=', $request->date_to);
        }

        $schedules = $query->paginate(20);
        $officers = User::securityOfficers()->active()->get();
        
        return Inertia::render('work-schedules/index', [
            'schedules' => $schedules,
            'officers' => $officers,
            'filters' => $request->only(['officer', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $officers = User::securityOfficers()->active()->get();
        
        return Inertia::render('work-schedules/create', [
            'officers' => $officers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkScheduleRequest $request)
    {
        $schedule = WorkSchedule::create($request->validated());

        return redirect()->route('work-schedules.index')
            ->with('success', 'Work schedule created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WorkSchedule $workSchedule)
    {
        $officers = User::securityOfficers()->active()->get();
        
        return Inertia::render('work-schedules/edit', [
            'schedule' => $workSchedule,
            'officers' => $officers
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkScheduleRequest $request, WorkSchedule $workSchedule)
    {
        $workSchedule->update($request->validated());

        return redirect()->route('work-schedules.index')
            ->with('success', 'Work schedule updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WorkSchedule $workSchedule)
    {
        $workSchedule->delete();

        return redirect()->route('work-schedules.index')
            ->with('success', 'Work schedule deleted successfully.');
    }
}