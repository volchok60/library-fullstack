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

import logging

logger = logging.getLogger("uvicorn")

router = APIRouter(prefix="/books", tags=["books"])

@router.head("/")
async def books_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(Book)
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get("/", response_model=BooksPublic)
def read_books(session: SessionDep, skip: int = 0, limit: int = 100) -> BooksPublic:
    """
    Retrieve books.
    """

    count_statement = select(func.count()).select_from(Book)
    count = session.exec(count_statement).one()
    
    statement = select(Book).offset(skip).limit(limit)
    books = session.exec(statement).all()

    return BooksPublic(books=books, count=count)


@router.post("/", response_model=BookPublic)
def create_book(*, session: SessionDep, book_in: BookCreate) -> BookPublic:
    """
    Create new book.
    """
    logger.info(f"Received book_in: {book_in}")
    book = crud.get_book_by_title(session=session, title=book_in.title)
    if book:
        raise HTTPException(
            status_code=400,
            detail="Such book already exists in the system.",
        )

    book = crud.create_book(session=session, book_in=book_in)
    return book

@router.get("/{id}", response_model=BookPublic)
def read_book_by_id(id: int, session: SessionDep) -> BookPublic:
    """
    Get a specific book by id.
    """
    book = session.get(Book, id)
    return book

@router.head("/available")
async def available_books_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(Book).where(Book.status == 3)  # Status 3: Available
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get("/available", response_model=BooksPublic)
def read_available_books(session: SessionDep, skip: int = 0, limit: int = 100) -> BooksPublic:
    """
    Retrieve available books.
    """

    count_statement = select(func.count()).select_from(Book).where(Book.status == 3)  # Status 3: Available
    count = session.exec(count_statement).one()
    
    statement = select(Book).offset(skip).limit(limit).where(Book.status == 3)  # Status 3: Available
    books = session.exec(statement).all()

    return BooksPublic(books=books, count=count)

@router.put("/{id}", response_model=BookPublic)
def update_book(
    *,
    session: SessionDep,
    id: int,
    book_in: BookUpdate,
) -> Any:
    """
    Update a book.
    """

    db_book = session.get(Book, id)
    if not db_book:
        raise HTTPException(
            status_code=404,
            detail="The book with this id does not exist in the system",
        )

    db_book = crud.update_book(session=session, db_book=db_book, book_in=book_in)
    return db_book

