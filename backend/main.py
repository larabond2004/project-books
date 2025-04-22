from fastapi import FastAPI
from backend.routers import books, cart, auth
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="Мой API для книг",
    description="Этот API позволяет управлять книгами и категориями.",
)


# Разрешенные источники (React-приложение)
origins = [
    "http://localhost:5173",  # Для Vite (React)
    "http://127.0.0.1:5173",  # Альтернативный локальный адрес
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

app.include_router(books.router)
app.include_router(cart.router)
app.include_router(auth.router)


if __name__ == "__main__":
    uvicorn.run("backend.main:app", reload=True)
