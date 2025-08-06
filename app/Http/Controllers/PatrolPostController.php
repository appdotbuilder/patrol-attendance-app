<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatrolPostRequest;
use App\Http\Requests\UpdatePatrolPostRequest;
use App\Models\PatrolPost;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PatrolPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = PatrolPost::latest()->paginate(10);
        
        return Inertia::render('patrol-posts/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('patrol-posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatrolPostRequest $request)
    {
        $post = PatrolPost::create([
            ...$request->validated(),
            'qr_code_token' => 'post_' . Str::random(16),
        ]);

        return redirect()->route('patrol-posts.show', $post)
            ->with('success', 'Patrol post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PatrolPost $patrolPost)
    {
        $patrolPost->load('attendances.user');
        
        return Inertia::render('patrol-posts/show', [
            'post' => $patrolPost
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PatrolPost $patrolPost)
    {
        return Inertia::render('patrol-posts/edit', [
            'post' => $patrolPost
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatrolPostRequest $request, PatrolPost $patrolPost)
    {
        $patrolPost->update($request->validated());

        return redirect()->route('patrol-posts.show', $patrolPost)
            ->with('success', 'Patrol post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PatrolPost $patrolPost)
    {
        $patrolPost->delete();

        return redirect()->route('patrol-posts.index')
            ->with('success', 'Patrol post deleted successfully.');
    }
}