from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import Todo, TodoCreate, TodoUpdate
from app.services import (
    get_all_todos as get_all_todos_service, 
    get_todo_by_id as get_todo_by_id_service, 
    create_todo as create_todo_service, 
    update_todo as update_todo_service, 
    delete_todo as delete_todo_service
)

router = APIRouter(
    prefix="/todos",
    tags=["todos"]
)

@router.get("/", response_model=List[Todo])
async def get_todos_endpoint():
    try:
        todos = get_all_todos_service()
        return todos
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al obtener TODOs")

@router.get("/{todo_id}", response_model=Todo)
async def get_todo_endpoint(todo_id: int):
    try:
        todo = get_todo_by_id_service(todo_id)
        if todo is None:
            raise HTTPException(status_code=404, detail="Todo not found")
        return todo 
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=Todo) # Lo que se manda al front es un Todo
async def create_todo_endpoint(todo: TodoCreate): # Lo que se recibe en el endpoint es un TodoCreate
    try:
        todo = create_todo_service(todo)
        return todo 
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error creating the todo")

@router.patch("/{todo_id}", response_model=Todo) # PATCH actualiza solo algunos campos
async def patch_todo_endpoint(todo_id: int, todo_update: TodoUpdate):
    try:
        todo = update_todo_service(todo_id, todo_update)
        if todo is None:
            raise HTTPException(status_code=404, detail="Todo not found")
        return todo 
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al actualizar TODO")

@router.delete("/{todo_id}")
async def delete_todo_endpoint(todo_id: int):
    try:
        success = delete_todo_service(todo_id)
        if not success:
            raise HTTPException(status_code=404, detail="Todo not found")
        return {"message": "TODO eliminado correctamente"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error al eliminar TODO")
