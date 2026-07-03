<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->decimal('last_latitude', 10, 7)->nullable()->after('remember_token');
            $table->decimal('last_longitude', 10, 7)->nullable()->after('last_latitude');
            $table->string('last_village')->nullable()->after('last_longitude');
            $table->string('last_mandal')->nullable()->after('last_village');
            $table->string('last_city')->nullable()->after('last_mandal');
            $table->string('last_district')->nullable()->after('last_city');
            $table->string('last_state')->nullable()->after('last_district');
            $table->string('last_pincode', 20)->nullable()->after('last_state');
            $table->string('last_country')->nullable()->after('last_pincode');
            $table->timestamp('location_captured_at')->nullable()->after('last_country');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'last_latitude',
                'last_longitude',
                'last_village',
                'last_mandal',
                'last_city',
                'last_district',
                'last_state',
                'last_pincode',
                'last_country',
                'location_captured_at',
            ]);
        });
    }
};
