from fastapi import APIRouter

from app.api.routes import login, private, users, books, genres, authors, book_copies, available_book_copies
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(books.router)
api_router.include_router(genres.router)
api_router.include_router(authors.router)
api_router.include_router(book_copies.router)
api_router.include_router(available_book_copies.router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
