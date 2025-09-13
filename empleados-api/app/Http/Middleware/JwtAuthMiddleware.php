<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JwtAuthMiddleware
{
    public function handle($request, Closure $next)
    {
        $header = $request->header('Authorization');
        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json(['error' => 'Token not provided'], 401);
        }
        $token = substr($header, 7);
        try {
            $decoded = JWT::decode($token, new Key(env('APP_KEY'), 'HS256'));
            // Puedes agregar validaciones extra aquí
        } catch (Exception $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        }
        return $next($request);
    }
}
