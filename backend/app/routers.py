from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import Todo, TodoCreate, TodoUpdate

router = APIRouter(
    prefix="/todos",
    tags=["todos"]
)

fake_todos_db = [
    {
        "id": 1,
        "title": "Aprender FastAPI",
        "description": "Crear una API REST con Python",
        "completed": False,
        "created_at": "2024-01-15T10:00:00"
    },
    {
        "id": 2,
        "title": "Configurar Supabase",
        "description": "Conectar la base de datos",
        "completed": True,
        "created_at": "2024-01-15T11:00:00"
    }
]

# GET all todos
@router.get("/", response_model=List[Todo])
async def get_todos():
    return fake_todos_db

# GET a specific todo by ID
@router.get("/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int):
    for todo in fake_todos_db:
        if todo["id"] == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

# POST a new todo
@router.post("/", response_model=Todo) # Lo que se envía es un Todo
async def create_todo(todo: TodoCreate): # Lo que se recibe es un TodoCreate
    new_id = max([t["id"] for t in fake_todos_db]) + 1 if fake_todos_db else 1
    new_todo = {
        "id":new_id,
        "title": todo.title,
        "description": todo.description,
        "completed": todo.completed,
        "created_at": "2024-01-15T12:00:00"  # Hardcoded for now
    }
    fake_todos_db.append(new_todo)
    return new_todo

""" Usaremos solo PATCH para actualizar parcialmente un todo y no PUT.
@router.put("/{todo_id}", response_model=Todo) # PUT reemplaza el todo completo
async def update_todo(todo_id: int, todo_update: TodoCreate):
    for i, todo in enumerate(fake_todos_db):
        if todo["id"] == todo_id:
            updated_todo = {
                "id": todo_id,
                "title": todo_update.title,
                "description": todo_update.description,
                "completed": todo_update.completed,
                "created_at": todo["created_at"]  # Keep original creation date
            }
            fake_todos_db[i] = updated_todo
            return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")
"""

@router.patch("/{todo_id}", response_model=Todo) # PATCH actualiza solo algunos campos
async def patch_todo(todo_id: int, todo_update: TodoUpdate):
    for i, todo in enumerate(fake_todos_db):
        if todo["id"] == todo_id:
            updated_todo = {
                "id": todo_id,
                "title": todo_update.title if todo_update.title else todo["title"],
                "description": todo_update.description if todo_update.description else todo["description"],
                "completed": todo_update.completed if todo_update.completed is not None else todo["completed"],
                "created_at": todo["created_at"]  # Keep original creation date
            }
            fake_todos_db[i] = updated_todo
            return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")

@router.delete("/{todo_id}")
async def delete_todo(todo_id: int):
    for i, todo in enumerate(fake_todos_db):
        if todo["id"] == todo_id:
            fake_todos_db.pop(i)
            return {"message": "TODO eliminado correctamente"}
    raise HTTPException(status_code=404, detail="Todo not found")