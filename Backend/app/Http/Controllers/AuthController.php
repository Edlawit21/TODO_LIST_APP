<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register function to handle user registration
    public function register(Request $request)
    {
        // Custom validation messages
        $messages = [
            'name.required' => 'The name field is required.',
            'name.max' => 'The name must not exceed 255 characters.',
            'email.required' => 'The email field is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'password.required' => 'The password field is required.',
        ];

        // Validate the incoming request with custom error messages
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ], $messages);

        // Create user and save to the database
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']) // Hash password before saving
        ]);

        // Generate token for the user using Sanctum
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Return user and token in response
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    // Login function to handle user login
    public function login(Request $request)
    {
        // Custom validation messages
        $messages = [
            'email.required' => 'The email field is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.exists' => 'The email is not registered.',
            'password.required' => 'The password field is required.',
        ];

        // Validate the incoming request with custom error messages
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ], $messages);

        // Check if the user exists
        $user = User::where('email', $request->email)->first();

        // Check if the password matches
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => [
                    'email' => ['Incorrect credentials.']
                ]
            ], 401);  // Unauthorized error
        }

        // Generate token for the user using Sanctum
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Return user and token in response
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    // Logout function to handle user logout
    public function logout(Request $request)
    {
        // Delete all the user's tokens to log them out
        $request->user()->tokens()->delete();

        // Return success message
        return response()->json([
            'message' => 'You are logged out.'
        ]);
    }
}
