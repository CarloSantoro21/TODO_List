'use client';

import { useState } from 'react';
import { TodoCreate } from '@/types/todo';
import { createTodo } from '@/lib/api';

interface TodoFormProps {
    onTodoCreated: () => void;
}

export default function TodoForm({ onTodoCreated }: TodoFormProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default reload on submission behavior

        if (!title.trim()) {
            setError('El título es obligatorio');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const todoData: TodoCreate = {
                title: title.trim(),
                description: description.trim(),
                completed: false
            };

            await createTodo(todoData);

            setTitle('');
            setDescription('');

            if (onTodoCreated) {
                onTodoCreated();
            }

        } catch (err) {
            console.error('Error creating todo:', err);
            setError('Failed to create todo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Crear Nuevo TODO
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Título *
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="¿Qué necesitas hacer?"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        disabled={loading}
                    />
                </div>
                {/* Campo Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detalles adicionales (opcional)"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                        disabled={loading}
                    />
                </div>
                {/* Error */}
                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                        {error}
                    </div>
                )}
                {/* Botón Submit */}
                <button
                    type="submit"
                    disabled={loading || !title.trim()}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Creando...' : 'Crear TODO'}
                </button>
            </form>
        </div>
    );
}