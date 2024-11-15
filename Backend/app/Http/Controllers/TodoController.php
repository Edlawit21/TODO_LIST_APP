<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    // Fetch all todo's
    public function index()
    {
        $user=auth()->user();
        $todos = $user->todos;
        return response()->json($todos, 200);
    }

    // Add a new todo's
 
public function store(Request $request)
{

    $messages = [
        'title.required' => 'The title field is required.',
        'title.max' => 'The title must not exceed 255 characters.',
        'status.in' => 'The status must be either pending or completed.',
        'is_important.boolean' => 'The importance field must be a boolean.',
    ];

    
    $fields = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'in:pending,completed',
        'is_important' => 'nullable|boolean',
    ], $messages);

    $user = auth()->user();

   
    $todo = $user->todos()->create([
        'title' => $fields['title'],
        'description' => $fields['description'],
        'status' => $fields['status'] ?? 'pending',
        'is_important' => $fields['is_important'] ?? false, 
    ]);

    return response()->json($todo, 201);
}


// Update an existing todo
public function update(Request $request, $id)
{
    $todo = Todo::find($id);
    
    if (!$todo) {
        return response()->json(['message' => 'Task not found'], 404);
    }

    // Validate the request
    $fields = $request->validate([
        'title' => 'sometimes|required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'in:pending,completed',
        'is_important' => 'nullable|boolean',
    ]);

    // Update todo with new fields
    $todo->update([
        'title' => $fields['title'] ?? $todo->title,
        'description' => $fields['description'] ?? $todo->description,
        'status' => $fields['status'] ?? $todo->status,
        'is_important' => $fields['is_important'] ?? $todo->is_important, // Keep the existing value if not provided
    ]);

    return response()->json($todo, 200);
}

    // Delete a todo
    public function destroy($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $todo->delete();

        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
