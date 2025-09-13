<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FamiliarDirecto;

class FamiliarDirectoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id_empleado)
    {
         $familiares = FamiliarDirecto::where('id_empleado', $id_empleado)->get();
        return response()->json($familiares, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
   public function store(Request $request, $id_empleado)
    {
        $request->validate([
            'nombre_familiar' => 'required|string|max:150',
            'parentesco' => 'required|string|max:100',
            'fecha_nacimiento' => 'required|date',
        ]);

        $familiar = FamiliarDirecto::create([
            'id_empleado' => $id_empleado,
            'nombre_familiar' => $request->nombre_familiar,
            'parentesco' => $request->parentesco,
            'fecha_nacimiento' => $request->fecha_nacimiento,
        ]);

        return response()->json($familiar, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         FamiliarDirecto::destroy($id);
        return response()->json(null, 204);
    }
}
