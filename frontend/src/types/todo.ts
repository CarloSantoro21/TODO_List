export interface Todo { // Lo que recibo del backend
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export interface TodoCreate { // Lo que se envía al backend
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoUpdate { // Actualizar el todo (campos opcionales)
  title?: string;
  description?: string;
  completed?: boolean;
}