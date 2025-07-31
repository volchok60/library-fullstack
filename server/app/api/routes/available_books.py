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
    BookPublic,
    BooksPublic,
)

router = APIRouter(prefix="/books/available", tags=["available-books"])

@router.head("/")
async def available_books_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(Book)
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get(
    "/",
    response_model=BooksPublic,
)
def read_book_copies(session: SessionDep, skip: int = 0, limit: int = 100) -> BooksPublic:
    """
    Retrieve available book copies.
    """

    count_statement = select(func.count()).select_from(Book) #TODO: Adjust to filter available copies
    count = session.exec(count_statement).one()
    # Fetch all books
    statement = select(Book).offset(skip).limit(limit)
    book_copies = session.exec(statement).all()

    return BooksPublic(data=book_copies, count=count)