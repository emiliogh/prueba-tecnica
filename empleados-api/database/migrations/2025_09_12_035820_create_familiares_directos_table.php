<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('familiares_directos', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_empleado');
        $table->string('nombre_familiar', 150);
        $table->string('parentesco', 100);
        $table->date('fecha_nacimiento');
        $table->timestamps();

        $table->foreign('id_empleado')
              ->references('id')->on('empleados')
              ->onDelete('cascade'); // si se elimina empleado, se eliminan familiares
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('familiares_directos');
    }
};
