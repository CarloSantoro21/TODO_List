
# 📝 TODO List App

Una aplicación completa de gestión de tareas construida con **NextJS** (frontend) y **FastAPI** (backend), desplegada en **Supabase**.

## 🎯 Objetivo del Proyecto

Este proyecto fue creado como un proceso de aprendizaje para dominar:
- **FastAPI**: Framework moderno de Python para APIs
- **NextJS**: Framework de React para aplicaciones web
- **Supabase**: Base de datos PostgreSQL como servicio
- **v0.dev**: Integración de componentes UI generados por IA
- **Desarrollo Full-Stack**: Arquitectura cliente-servidor completa

## 🏗️ Arquitectura

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    SQL    ┌─────────────────┐
│   NextJS        │ ──────────────► │   FastAPI       │ ────────► │   Supabase      │
│   (Frontend)    │                 │   (Backend)     │           │   (Database)    │
│   Port: 3000    │ ◄────────────── │   Port: 8000    │ ◄──────── │   PostgreSQL    │
└─────────────────┘    JSON         └─────────────────┘           └─────────────────┘
```

## 🛠️ Tecnologías

### Frontend
- **NextJS 14**: Framework React con App Router
- **Tailwind CSS**: Framework de estilos
- **shadcn/ui**: Componentes UI reutilizables
- **TypeScript**: Tipado estático

### Backend
- **FastAPI**: Framework de Python para APIs
- **SQLAlchemy**: ORM para base de datos
- **Pydantic**: Validación de datos
- **JWT**: Autenticación con tokens

### Base de Datos
- **Supabase**: PostgreSQL como servicio
- **Autenticación**: Sistema de usuarios integrado

## 🚀 Características

### Funcionalidades Principales
- ✅ CRUD completo de tareas (Crear, Leer, Actualizar, Eliminar)
- 🔐 Sistema de autenticación (Registro/Login)
- 👤 Gestión de usuarios
- 🏷️ Categorías y etiquetas
- 📅 Fechas de vencimiento
- 🔍 Filtros y búsqueda
- 📱 Diseño responsive

### Funcionalidades Técnicas
- 🔒 API RESTful segura
- 🚀 Documentación automática (Swagger/OpenAPI)
- 🧪 Tests unitarios y de integración
- 🌐 Despliegue en la nube
- 📊 Manejo de estados avanzado

## 📚 Roadmap de Aprendizaje

### Fase 1: Fundamentos (Días 1-2) ← AQUÍ ESTAMOS
- [ ] Conceptos de APIs RESTful
- [ ] Configuración del entorno de desarrollo
- [ ] Estructura del proyecto

### Fase 2: Backend - FastAPI (Días 3-5)
- [ ] Crear primera API
- [ ] Conectar con Supabase
- [ ] Implementar CRUD de TODOs

### Fase 3: Autenticación (Días 6-7)
- [ ] Sistema de usuarios
- [ ] JWT y middleware de seguridad

### Fase 4: Frontend - NextJS (Días 8-12)
- [ ] Configurar NextJS
- [ ] Integrar componentes de v0.dev
- [ ] Conectar con el backend

### Fase 5: Integración (Días 13-15)
- [ ] Funcionalidades avanzadas
- [ ] Optimizaciones

### Fase 6: Despliegue (Días 16-17)
- [ ] Configurar producción
- [ ] Desplegar aplicación

### Fase 7: Testing y Mejores Prácticas (Días 18-20)
- [ ] Implementar tests
- [ ] Documentación final

## 🗂️ Estructura del Proyecto

```
TODO_List/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # Punto de entrada
│   │   ├── models/         # Modelos de base de datos
│   │   ├── schemas/        # Esquemas Pydantic
│   │   ├── routers/        # Rutas de la API
│   │   ├── services/       # Lógica de negocio
│   │   ├── database.py     # Configuración de BD
│   │   └── auth.py         # Autenticación
│   ├── requirements.txt    # Dependencias Python
│   └── .env               # Variables de entorno
├── frontend/               # Aplicación NextJS
│   ├── src/
│   │   ├── app/           # App Router
│   │   ├── components/    # Componentes React
│   │   ├── lib/          # Utilidades
│   │   └── types/        # Tipos TypeScript
│   ├── package.json      # Dependencias Node
│   └── .env.local       # Variables de entorno
└── README.md
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- Node.js 18+
- Git
- Cuenta en Supabase

### Backend (FastAPI)
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (NextJS)
```bash
cd frontend
npm install
npm run dev
```

## 📖 Documentación

- **API Docs**: http://localhost:8000/docs (Swagger UI)
- **Frontend**: http://localhost:3000

---

**Creado por**: Carlo  
**Fecha**: Julio 2025  
**Propósito**: Aprender desarrollo Full-Stack moderno

## 📚 CONCEPTOS FUNDAMENTALES - ¡EMPEZAMOS AQUÍ!

### 🌐 ¿Qué es una API RESTful?

**API** = **A**pplication **P**rogramming **I**nterface (Interfaz de Programación de Aplicaciones)

Imagina que vas a un restaurante:
- **Cliente (Frontend)**: Tú, que quieres comer
- **Mesero (API)**: Toma tu pedido y lo lleva a la cocina
- **Cocina (Backend)**: Prepara la comida
- **Base de datos**: La despensa donde están los ingredientes

La **API** es como el mesero: es el intermediario que lleva mensajes entre el cliente y la cocina.

**REST** = **RE**presentational **S**tate **T**ransfer

Son las "reglas" que sigue el mesero:
- **GET**: "Tráeme el menú" (obtener información)
- **POST**: "Quiero ordenar esto" (crear algo nuevo)
- **PUT**: "Cambia mi pedido" (actualizar algo existente)
- **DELETE**: "Cancela mi pedido" (eliminar algo)

### 🚀 ¿Qué es FastAPI?

FastAPI es como tener un **mesero super eficiente** que:
- ✅ Es muy rápido sirviendo
- ✅ Entiende perfectamente lo que le pides
- ✅ Te da un menú muy claro de lo que puede hacer
- ✅ Nunca se equivoca con los pedidos

**¿Por qué usamos FastAPI?**
- Está hecho en Python (fácil de aprender)
- Es súper rápido
- Genera documentación automática
- Valida automáticamente los datos

### ⚛️ ¿Qué es NextJS?

NextJS es como tener una **cocina moderna** para hacer páginas web:
- Está basado en **React** (librería para interfaces)
- Te da herramientas pre-construidas
- Optimiza automáticamente tu sitio web
- Maneja las rutas (URLs) automáticamente

**React** = Como tener ingredientes pre-procesados  
**NextJS** = Como tener una cocina completa con todos los utensilios

### 🗃️ ¿Qué es Supabase?

Supabase es como tener un **almacén gigante** que:
- Guarda todos tus datos de forma organizada
- Nunca se pierde nada
- Puedes acceder desde cualquier lugar
- Tiene seguridad incluida

Es **PostgreSQL** (una base de datos) pero en la nube, sin que tengas que instalar nada.

### 🔄 Ejemplo Práctico: ¿Cómo funciona nuestra TODO App?

**Escenario**: Usuario quiere crear una nueva tarea

```
1. Usuario escribe "Comprar leche" en la página web (NextJS)
2. NextJS envía una petición HTTP POST a FastAPI:
   POST http://localhost:8000/todos
   {
     "title": "Comprar leche",
     "completed": false
   }

3. FastAPI recibe la petición y:
   - Valida que los datos estén correctos
   - Guarda la tarea en Supabase
   - Responde con la tarea creada

4. NextJS recibe la respuesta y actualiza la página
5. Usuario ve su nueva tarea en la lista
```

### 🛠️ CONFIGURACIÓN DEL ENTORNO - PASO A PASO

Ahora vamos a configurar tu computadora para desarrollar. Vamos a verificar qué tienes instalado:
