'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/types/todo';
import { getTodos, deleteTodo, updateTodo } from '@/lib/api';
import TodoForm from './TodoForm';

export default function TodoList() {
    // estados del componente
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<number | null>(null); 
    const [toggling, setToggling] = useState<number | null>(null);
    const [editing, setEditing] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');
    const [editDescription, setEditDescription] = useState<string>('');
    const [updating, setUpdating] = useState<boolean>(false);

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
    };

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

    const handleToggleComplete = async (todo: Todo) => {
        try {
            setToggling(todo.id);
            console.log('Toggling TODO:', todo.id);

            const updatedData = {
                completed: !todo.completed // Invertir el estado de completado
            };

            console.log('Updating TODO:', todo.id, 'with data:', updatedData);

            const updatedTodo = await updateTodo(todo.id, updatedData);
            console.log('Updated TODO:', updatedTodo);

            // actualizar lista local
            setTodos(prevTodos => 
                prevTodos.map(t => 
                    t.id === todo.id 
                        ? { ...t, completed: updatedData.completed }
                        : t
                )
            );

            console.log('TODO updated successfully:', updatedTodo);

        } catch (err) {
            console.error('Error updating TODO:', err);
            setError('Error al actualizar el TODO');
           
        } finally {
            setToggling(null);
        }
    };

    const handleStartEdit = (todo: Todo) => {
        setEditing(todo.id);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
    };

    const handleCancelEdit = () => {
        setEditing(null);
        setEditTitle('');
        setEditDescription('');
    };

    const handleSaveEdit = async (todoId: number) => {
        try {
            if (!editTitle.trim()) {
                setError('El título es obligatorio');
                return;
            }

            setUpdating(true);

            const updateData = {
                title: editTitle,
                description: editDescription
            };

            const updatedTodo = await updateTodo(todoId, updateData);

            setTodos(prevTodos =>
                prevTodos.map(t =>
                    t.id === todoId
                        ? { ...t, title: updatedTodo.title, description: updatedTodo.description }
                        : t
                )
            );

            setEditing(null);
            setEditTitle('');
            setEditDescription('');

        } catch (err) {
            console.error('Error updating TODO:', err);
            setError('Error al actualizar el TODO');
        } finally {
            setUpdating(false);
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
                                        {/* Toggle Complete */}
                                        <button
                                            onClick={() => handleToggleComplete(todo)}
                                            disabled={toggling === todo.id}
                                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200 ${
                                                toggling === todo.id
                                                    ? 'border-blue-500 bg-blue-50' // Estado loading
                                                    : todo.completed 
                                                        ? 'bg-green-500 border-green-500 hover:bg-green-600' // Completado
                                                        : 'border-gray-300 hover:border-gray-400' // Pendiente
                                            } ${toggling === todo.id ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {/* Toggle button */}
                                            {toggling === todo.id ? (
                                                // LOADING SPINNER
                                                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            ) : todo.completed ? (
                                                // CHECKMARK
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : null}
                                        </button>
                                        {/* Título */}
                                        {editing === todo.id ? (
                                            // MODO EDICIÓN: INPUT
                                            <input
                                                type="text"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                                className="text-lg font-semibold bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 text-gray-900"
                                                disabled={updating}
                                            />
                                        ) : (
                                            // MODO NORMAL: TEXTO
                                            <h3 className={`text-lg font-semibold ${
                                                todo.completed 
                                                    ? 'text-gray-500 line-through' 
                                                    : 'text-gray-900'
                                            }`}>
                                                {todo.title}
                                            </h3>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    {editing === todo.id ? (
                                        // MODO EDICIÓN: TEXTAREA
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            className="w-full ml-8 bg-white border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                            rows={2}
                                            disabled={updating}
                                        />
                                    ) : (
                                        // MODO NORMAL: TEXTO
                                        <p className={`text-sm ml-8 ${
                                            todo.completed ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {todo.description}
                                        </p>
                                    )}
                                    
                                    <p className="text-xs text-gray-400 ml-11 mt-2">
                                        Creado: {new Date(todo.created_at).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* BOTONES DE ACCIÓN */}
                                <div className="flex space-x-2 ml-4">
                                    {editing === todo.id ? (
                                        // BOTONES DE EDICIÓN
                                        <>
                                            <button
                                                onClick={() => handleSaveEdit(todo.id)}
                                                disabled={updating || !editTitle.trim()}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {updating ? 'Guardando...' : 'Guardar'}
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                disabled={updating}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        // BOTONES NORMALES
                                        <>
                                            <button
                                                onClick={() => handleStartEdit(todo)}
                                                disabled={editing !== null || deleting === todo.id || toggling === todo.id}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteTodo(todo.id)}
                                                disabled={deleting === todo.id || editing !== null}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {deleting === todo.id ? 'Eliminando...' : 'Eliminar'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

