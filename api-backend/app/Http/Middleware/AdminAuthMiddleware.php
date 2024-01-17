<?php

namespace App\Http\Middleware;

use App\Models\Delivery_man;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $userId = Auth::id();

            // Vérifiez si l'id de l'utilisateur est présent dans la table des admins
            if (Delivery_man::where('id_user', $userId)->exists()) {
                return $next($request);
            }
        } catch (\Throwable $th) {
            Auth::logout();
            return redirect('login');
        }

        // Si l'id de l'utilisateur n'est pas présent dans la table des admins
        return response()->json(['message' => 'Unauthorized.'], 403);
    }
}
