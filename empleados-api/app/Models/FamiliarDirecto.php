<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamiliarDirecto extends Model
{
    use HasFactory;

    protected $table = 'familiares_directos';

    protected $fillable = ['id_empleado','nombre_familiar','parentesco','fecha_nacimiento'];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'id_empleado');
    }
    
}
