from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import router as todos_router

app = FastAPI(
    title="TODO List API",
    description="A simple FastAPI application for managing TODOs",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)

# Esta función incluye todas las rutas de TODOs
app.include_router(todos_router)

@app.get("/")
def read_root():
    return {"message": "TODO API is running!"}