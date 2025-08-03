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
    GenreBase,
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
    Retrieve genres.
    """

    count_statement = select(func.count()).select_from(Genre)
    count = session.exec(count_statement).one()
    
    statement = select(Genre).offset(skip).limit(limit)
    genres = session.exec(statement).all()

    return GenresPublic(genres=genres, count=count)

@router.post("/", response_model=GenrePublic)
def create_genre(*, session: SessionDep, genre_in: GenreCreate) -> GenrePublic:
    """
    Create new genre.
    """
    genre = crud.get_genre_by_title(session=session, title=genre_in.title)
    if genre:
        raise HTTPException(
            status_code=400,
            detail="This genre already exists in the system.",
        )

    genre = crud.create_genre(session=session, genre_in=genre_in)
    return genre

@router.get("/{genre_id}", response_model=GenrePublic)
def read_genre_by_id(
    genre_id: int, session: SessionDep
) -> Any:
    """
    Get a specific genre by id.
    """
    genre = session.get(Genre, genre_id)
    return genre

@router.put("/{id}", response_model=GenrePublic)
def update_genre(
    *,
    session: SessionDep,
    id: int,
    genre_in: GenreUpdate,
) -> Any:
    """
    Update a genre.
    """

    db_genre = session.get(Genre, id)
    if not db_genre:
        raise HTTPException(
            status_code=404,
            detail="The genre with this id does not exist in the system",
        )

    db_genre = crud.update_genre(session=session, db_genre=db_genre, genre_in=genre_in)
    return db_genre

@router.delete("/{id}")
def delete_user(
    session: SessionDep, id: int
) -> Message:
    """
    Delete a genre.
    """
    genre = session.get(Genre, id)
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    session.delete(genre)
    session.commit()
    return Message(message="Genre deleted successfully")
