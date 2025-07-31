from fastapi import FastAPI
from app.routers import router as todos_router

app = FastAPI(
    title="TODO List API",
    description="A simple FastAPI application for managing TODOs",
    version="1.0.0"
)

# Esta función ya incluye todas las rutas de TODOs
app.include_router(todos_router)

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"¡Hola, {name}!"}

@app.get("/add")
async def add_numbers(a: int, b: int):
    return {"result": a+b}