import { Todo, TodoCreate, TodoUpdate } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos/`);
  if (!response.ok) {
    throw new Error('Error al obtener TODOs');
  }
  return response.json();
}

export async function getTodo(id: number): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  if (!response.ok) {
    throw new Error(`Error al obtener el TODO ${id}`);
  }
  return response.json();
}

export async function createTodo(todo: TodoCreate): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  if (!response.ok) {
    throw new Error('Error al crear el TODO');
  }
  return response.json();
}

export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  if (!response.ok) {
    throw new Error(`Error al actualizar el TODO ${id}`);
  }
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(`Error al eliminar el TODO ${id}`);
  }
}