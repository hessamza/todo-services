<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    /**
     * Login user and generate JWT token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid credentials'], 400);
        }

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function validateToken(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
          $token=JWTAuth::getToken();
           $user = JWTAuth::authenticate($token);
            if (!$user) {
                return response()->json(['error' => 'Invalid token'], 402);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not validate token'], 500);
        }

        return response()->json(['user' => $user]);
    }
}
