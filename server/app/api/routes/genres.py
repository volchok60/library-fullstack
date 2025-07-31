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
    Genre,
    GenreCreate,
    GenrePublic,
    GenreUpdate,
    GenresPublic,
)

router = APIRouter(prefix="/genres", tags=["genres"])

@router.head("/")
async def genres_count(session: SessionDep) -> Response:
    count_statement = select(func.count()).select_from(Genre)
    count = session.exec(count_statement).one()

    response = Response(status_code=200)
    response.headers["x-result-count"] = str(count)
    return response

@router.get(
    "/",
    response_model=GenresPublic,
)
def read_genres(session: SessionDep, skip: int = 0, limit: int = 100) -> GenresPublic:
    """
    Retrieve books.
    """

    count_statement = select(func.count()).select_from(Genre)
    count = session.exec(count_statement).one()
    # Fetch all books
    statement = select(Genre).offset(skip).limit(limit)
    genres = session.exec(statement).all()

    return GenresPublic(data=genres, count=count)

@router.post(
    "/", response_model=GenrePublic
)
def create_genre(*, session: SessionDep, genre_in: GenreCreate) -> Any:
    """
    Create new genre.
    """
    genre = crud.get_genre_by_name(session=session, name=genre_in.name)
    if genre:
        raise HTTPException(
            status_code=400,
            detail="This genre already exists in the system.",
        )

    genre = crud.create_genre(session=session, genre_in=genre_in)
    return genre
