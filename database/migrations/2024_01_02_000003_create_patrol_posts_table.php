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
        Schema::create('patrol_posts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Post name (e.g., Main Gate, Parking Lot)');
            $table->text('description')->nullable()->comment('Post description');
            $table->string('qr_code_token')->unique()->comment('Unique QR code token for this post');
            $table->decimal('latitude', 10, 8)->nullable()->comment('Post latitude coordinates');
            $table->decimal('longitude', 11, 8)->nullable()->comment('Post longitude coordinates');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Post status');
            $table->timestamps();
            
            $table->index('qr_code_token');
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patrol_posts');
    }
};