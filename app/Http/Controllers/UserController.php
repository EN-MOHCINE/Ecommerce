<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required' => 'The name field is required.',
            'email.unique' => 'the email already exist',
            'password.required' => 'The password field is required.',
            'password.min' => 'The password must be at least :min characters.',
            'password.confirmed' => 'The password confirmation does not match.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);
        return response()->json([
            'sucess' => true,
        ]);
    }


    function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        $validator->after(function ($validator) use ($request) {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                $validator->errors()->add('email', 'Email does not exist');
            } elseif (!Hash::check($request->password, $user->password)) {
                $validator->errors()->add('password', 'Incorrect password');
            }
        });
        $credentials = $request->only('email', 'password');
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        } elseif (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'name' => $user->name,
                'id' => $user->user_id,
                'role'=>$user->role_id

            ]);
        } else {
            return response()->json(['success' => false]);
        }
    }
    function updateRole(Request $request,$id=null){
        $user = User::where('user_id',$id)->first();
        $user->role_id = $request->role_id;
        $user->save();
        return response()->json(['message' => 'User role updated successfully'], 200);;
    }
    
}
