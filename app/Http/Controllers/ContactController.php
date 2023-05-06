<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{ 
    public function sendEmail(Request $request)
    {
        $datalist = [
            'email' => $request->email,
            'name' => $request->FirstName,
            'Lname' => $request->LastName,
            'message' => $request->message,
        ];
        Mail::to('houssamtkd03@gmail.com')->send(new ContactMail($datalist));
        
        return response()->json([
            'status' => 'success',
            'message' => 'Email sent successfully'
        ]);
        dd($request);
    }
}


