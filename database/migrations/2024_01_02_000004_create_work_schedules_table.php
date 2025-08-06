<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('work_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('date')->comment('Schedule date');
            $table->enum('type', ['working', 'holiday'])->default('working')->comment('Schedule type');
            $table->time('start_time')->nullable()->comment('Working start time');
            $table->time('end_time')->nullable()->comment('Working end time');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->unique(['user_id', 'date']);
            $table->index('user_id');
            $table->index('date');
            $table->index(['user_id', 'date']);
            $table->index(['date', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_schedules');
    }
};