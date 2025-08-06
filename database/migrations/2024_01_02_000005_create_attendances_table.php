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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('patrol_post_id')->constrained()->cascadeOnDelete();
            $table->timestamp('scanned_at')->comment('Timestamp when QR code was scanned');
            $table->decimal('latitude', 10, 8)->nullable()->comment('Officer latitude during scan');
            $table->decimal('longitude', 11, 8)->nullable()->comment('Officer longitude during scan');
            $table->enum('patrol_status', ['on_patrol', 'completed', 'incomplete'])->default('on_patrol')->comment('Patrol status');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('patrol_post_id');
            $table->index('scanned_at');
            $table->index(['user_id', 'scanned_at']);
            $table->index(['patrol_post_id', 'scanned_at']);
            $table->index(['scanned_at', 'patrol_status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};