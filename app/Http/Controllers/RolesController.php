<?php

namespace App\Http\Controllers;

use App\Models\roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RolesController extends Controller
{
    function getRoles(){
        $roles=roles::all();
        return $roles;
    }
    
    function userFilter(Request $request){
        $users = DB::table('users')->join('roles','roles.role_id','users.role_id')->select('user_id','name',"email","address","phone","code_postal", 'name_role');
        if ($request->role) {
            $users->where('users.role_id',$request->role);
        }
        if ($request->name!==null && $request->name!== 'all') {
                $users->where('name',$request->name);
            }

        $results=$users->paginate(20);
        return $results;
        
    }
}
