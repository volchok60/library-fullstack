import uuid
from typing import Any

from fastapi import APIRouter, Response, Depends, HTTPException
from sqlmodel import col, delete, func, select

from app import crud
from app.api.deps import (
    SessionDep,
)

from app.models import (
    Message,
    Book,
    BookCreate,
    BookPublic,
    BookUpdate,
    BooksPublic,
)

router = APIRouter(prefix="/books", tags=["books"])

@router.head("/")
async def books_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(Book)
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get(
    "/",
    response_model=BooksPublic,
)
def read_books(session: SessionDep, skip: int = 0, limit: int = 100) -> BooksPublic:
    """
    Retrieve books.
    """

    count_statement = select(func.count()).select_from(Book)
    count = session.exec(count_statement).one()
    # Fetch all books
    statement = select(Book).offset(skip).limit(limit)
    books = session.exec(statement).all()

    return BooksPublic(books=books, count=count)