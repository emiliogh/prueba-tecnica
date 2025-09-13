<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class TokenController extends Controller
{
    public function issue(Request $request)
    {
        $request->validate([
            'client_id' => 'required|string',
            'client_secret' => 'required|string',
        ]);

        // Simulación de credenciales válidas
        $validClientId = 'angular-app';
        $validClientSecret = 'angular-secret';

        if ($request->client_id !== $validClientId || $request->client_secret !== $validClientSecret) {
            return response()->json(['error' => 'Invalid client credentials'], 401);
        }

        $payload = [
            'iss' => url('/'),
            'client_id' => $request->client_id,
            'iat' => time(),
            'exp' => time() + 3600,
        ];
        $jwt = JWT::encode($payload, env('APP_KEY'), 'HS256');

        return response()->json(['access_token' => $jwt, 'token_type' => 'Bearer', 'expires_in' => 3600]);
    }
}
