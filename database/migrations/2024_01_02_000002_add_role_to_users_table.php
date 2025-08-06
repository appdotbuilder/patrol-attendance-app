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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('email')->constrained()->nullOnDelete();
            $table->string('qr_code_token')->nullable()->unique()->after('role_id');
            $table->string('employee_id')->nullable()->unique()->after('qr_code_token');
            $table->enum('status', ['active', 'inactive'])->default('active')->after('employee_id');
            
            $table->index('role_id');
            $table->index('qr_code_token');
            $table->index('employee_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn(['role_id', 'qr_code_token', 'employee_id', 'status']);
        });
    }
};