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
    Author,
    AuthorCreate,
    AuthorPublic,
    AuthorUpdate,
    AuthorsPublic,
)

router = APIRouter(prefix="/authors", tags=["authors"])

@router.head("/")
async def authors_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(Author)
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get(
    "/",
    response_model=AuthorsPublic,
)
def read_authors(session: SessionDep, skip: int = 0, limit: int = 100) -> AuthorsPublic:
    """
    Retrieve authors.
    """

    count_statement = select(func.count()).select_from(Author)
    count = session.exec(count_statement).one()
    # Fetch all authors
    statement = select(Author).offset(skip).limit(limit)
    books = session.exec(statement).all()

    return AuthorsPublic(data=books, count=count)

@router.post(
    "/", response_model=AuthorPublic
)
def create_author(*, session: SessionDep, author_in: AuthorCreate) -> AuthorPublic:
    """
    Create new author.
    """
    author = crud.get_author_by_full_name(session=session, first_name=author_in.first_namename, family_name=author_in.family_name)
    if author:
        raise HTTPException(
            status_code=400,
            detail="Such author already exists in the system.",
        )

    author = crud.create_author(session=session, author_in=author_in)
    return author
