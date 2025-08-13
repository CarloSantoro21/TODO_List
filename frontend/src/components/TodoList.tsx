'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import { getTodos, deleteTodo } from '@/lib/api';
import TodoForm from './TodoForm';

export default function TodoList() {
    // estados del componente
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null); // ← Nuevo estado


    async function loadTodos() {
        try {
            setLoading(true);
            setError(null);
            const todosData = await getTodos();
            setTodos(todosData);
        } catch (err) {
            setError('Error al cargar los TODOs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteTodo = async (id: number) => {
        try {
            setDeleting(id);
            await deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el TODO');
        } finally {
            setDeleting(null);
        }
    };

    // cargar los TODOs al montar el componente
    useEffect(() => {
        loadTodos();
    }, []);

    const handleTodoCreated = () => {
        loadTodos(); // Recargar la lista
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Cargando TODOs...</div>
            </div>
        );
    }

    if (error) {
        return (
        <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
        </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Mis TODOs
                </h1>
                <p className="text-gray-600">
                    Tienes {todos.length} {todos.length === 1 ? 'tarea' : 'tareas'}
                </p>
            </div>

            <TodoForm onTodoCreated={handleTodoCreated} />

            {/*LISTA DE TODOs */}
            {todos.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No tienes TODOs aún
                    </h3>
                    <p className="text-gray-500">
                        ¡Crea tu primera tarea para empezar!
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/*TODO ITEM */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <p className="text-lg mr-3 text-gray-900 font-semibold">
                                            {todo.completed ? '[DONE]' : '[PENDING]'}
                                        </p>
                                        <h3 className={`text-lg font-semibold ${
                                            todo.completed 
                                                ? 'text-gray-500 line-through' 
                                                : 'text-gray-900'
                                            }`}>
                                            {todo.title}
                                        </h3>
                                    </div>
                                    <p className={`text-sm ml-11 ${
                                        todo.completed ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                        {todo.description}
                                    </p>
                                    <p className="text-xs text-gray-400 ml-11 mt-2">
                                        Creado: {new Date(todo.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                {/* 🔧 BOTONES DE ACCIÓN */}
                                <div className="flex space-x-2 ml-4">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Editar
                                    </button>
                                    <button onClick={() => handleDeleteTodo(todo.id)}
                                        disabled={deleting === todo.id}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {deleting === todo.id ? 'Eliminando...' : 'Eliminar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

