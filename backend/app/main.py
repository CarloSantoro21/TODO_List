from fastapi import FastAPI
from app.routers import router as todos_router

app = FastAPI(
    title="TODO List API",
    description="A simple FastAPI application for managing TODOs",
    version="1.0.0"
)

# Esta función incluye todas las rutas de TODOs
app.include_router(todos_router)