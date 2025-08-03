from typing import List, Optional
from app.database import get_supabase_client
from app.schemas import TodoCreate, TodoUpdate

def get_all_todos() -> List[dict]:
    supabase = get_supabase_client()
    result = supabase.table('todos').select("*").order('created_at', desc=True).execute()
    return result.data

def get_todo_by_id(todo_id: int) -> Optional[dict]:
    supabase = get_supabase_client()
    result = supabase.table('todos').select("*").eq('id', todo_id).execute()
    return result.data[0] if result.data else None

def create_todo(todo: TodoCreate) -> dict:
    supabase = get_supabase_client()
    todo_data = {
        "title": todo.title,
        "description": todo.description,
        "completed": todo.completed,
    }
    result = supabase.table('todos').insert(todo_data).execute()
    return result.data[0]

def update_todo(todo_id: int, todo_update: TodoUpdate) -> Optional[dict]:
    supabase = get_supabase_client()
    
    update_data = {}
    if todo_update.title is not None:
        update_data["title"] = todo_update.title
    if todo_update.description is not None:
        update_data["description"] = todo_update.description
    if todo_update.completed is not None:
        update_data["completed"] = todo_update.completed
    
    if update_data:
        result = supabase.table('todos').update(update_data).eq('id', todo_id).execute()
        if result.data:
            return result.data[0]
    
    return None

def delete_todo(todo_id: int) -> bool:
    supabase = get_supabase_client()
    result = supabase.table('todos').delete().eq('id', todo_id).execute()
    return len(result.data) > 0