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
        Schema::table('products', function (Blueprint $table) {
            Schema::disableForeignKeyConstraints();
                $table->unsignedBigInteger('size_id');
                $table->unsignedBigInteger('collection_id');
                $table->foreign('size_id')->references('size_id')->on('sizes')->onDelete('cascade');
                $table->foreign('collection_id')->references('collection_id')->on('collections')->onDelete('cascade');
            Schema::enableForeignKeyConstraints();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            //
        });
    }
};
