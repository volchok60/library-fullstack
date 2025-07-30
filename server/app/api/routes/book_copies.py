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
    BookCopy,
    BookCopyCreate,
    BookCopyPublic,
    BookCopyUpdate,
    BookCopiesPublic,
)

router = APIRouter(prefix="/copies", tags=["copies"])

@router.head("/")
async def book_copies_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(BookCopy)
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get(
    "/",
    response_model=BookCopiesPublic,
)
def read_book_copies(session: SessionDep, skip: int = 0, limit: int = 100) -> BookCopiesPublic:
    """
    Retrieve book copies.
    """

    count_statement = select(func.count()).select_from(BookCopy)
    count = session.exec(count_statement).one()
    # Fetch all books
    statement = select(BookCopy).offset(skip).limit(limit)
    book_copies = session.exec(statement).all()

    return BookCopiesPublic(data=book_copies, count=count)