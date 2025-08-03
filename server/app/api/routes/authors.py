import sys
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
    AuthorBase,
    AuthorCreate,
    AuthorPublic,
    AuthorUpdate,
    AuthorsPublic,
)

import logging

logger = logging.getLogger("uvicorn")

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
    response_model=AuthorsPublic
)
def read_authors(session: SessionDep, skip: int = 0, limit: int = 100) -> AuthorsPublic:
    """
    Retrieve authors.
    """

    count_statement = select(func.count()).select_from(Author)
    count = session.exec(count_statement).one()
    
    statement = select(Author).offset(skip).limit(limit)
    authors = session.exec(statement).all()

    return AuthorsPublic(authors=authors, count=count)

@router.post("/", response_model=AuthorPublic)
def create_author(*, session: SessionDep, author_in: AuthorCreate) -> AuthorPublic:
    """
    Create new author.
    """
    logger.info(f"Received author_in: {author_in}")

    author = crud.get_author_by_full_name(session=session, first_name=author_in.first_name, family_name=author_in.family_name)
    if author:
        raise HTTPException(
            status_code=400,
            detail="Such author already exists in the system.",
        )

    author = crud.create_author(session=session, author_in=author_in)
    return author

@router.get("/{id}", response_model=AuthorPublic)
def read_author_by_id(
    id: int, session: SessionDep
) -> Any:
    """
    Get a specific author by id.
    """
    author = session.get(Author, id)
    return author

@router.put("/{id}", response_model=AuthorPublic)
def update_author(
    *,
    session: SessionDep,
    id: int,
    author_in: AuthorUpdate,
) -> Any:
    """
    Update an author.
    """

    db_author = session.get(Author, id)
    if not db_author:
        raise HTTPException(
            status_code=404,
            detail="The author with this id does not exist in the system",
        )

    db_author = crud.update_author(session=session, db_author=db_author, author_in=author_in)
    return db_author

