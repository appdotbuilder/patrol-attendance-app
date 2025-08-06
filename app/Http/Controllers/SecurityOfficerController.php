<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSecurityOfficerRequest;
use App\Http\Requests\UpdateSecurityOfficerRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SecurityOfficerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $officers = User::with('role')
            ->securityOfficers()
            ->latest()
            ->paginate(10);
        
        return Inertia::render('security-officers/index', [
            'officers' => $officers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('security-officers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSecurityOfficerRequest $request)
    {
        $securityRole = Role::where('name', 'security_officer')->first();
        
        $officer = User::create([
            ...$request->validated(),
            'role_id' => $securityRole->id,
            'qr_code_token' => 'officer_' . Str::random(16),
        ]);

        return redirect()->route('security-officers.show', $officer)
            ->with('success', 'Security officer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $securityOfficer)
    {
        $securityOfficer->load('role', 'attendances.patrolPost', 'workSchedules');
        
        return Inertia::render('security-officers/show', [
            'officer' => $securityOfficer
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $securityOfficer)
    {
        return Inertia::render('security-officers/edit', [
            'officer' => $securityOfficer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSecurityOfficerRequest $request, User $securityOfficer)
    {
        $securityOfficer->update($request->validated());

        return redirect()->route('security-officers.show', $securityOfficer)
            ->with('success', 'Security officer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $securityOfficer)
    {
        $securityOfficer->delete();

        return redirect()->route('security-officers.index')
            ->with('success', 'Security officer deleted successfully.');
    }
}