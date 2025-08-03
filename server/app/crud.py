import uuid
from typing import Any

from sqlmodel import Session, select

from app.core.security import get_password_hash, verify_password
from app.models import AuthorUpdate, BookUpdate, GenreUpdate, User, UserCreate, UserUpdate, Genre, GenreCreate, Author, AuthorCreate, Book, BookCreate

# CRUD operations for User
def create_user(*, session: Session, user_create: UserCreate) -> User:
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def update_user(*, session: Session, db_user: User, user_in: UserUpdate) -> Any:
    user_data = user_in.model_dump(exclude_unset=True)
    extra_data = {}
    if "password" in user_data:
        password = user_data["password"]
        hashed_password = get_password_hash(password)
        extra_data["hashed_password"] = hashed_password
    db_user.sqlmodel_update(user_data, update=extra_data)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_user_by_email(*, session: Session, email: str) -> User | None:
    statement = select(User).where(User.email == email)
    session_user = session.exec(statement).first()
    return session_user

def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user

# CRUD operations for Genre
def get_genre_by_title(*, session: Session, title: str) -> Genre | None:
    statement = select(Genre).where(Genre.title == title)
    genre = session.exec(statement).first()
    return genre

def create_genre(*, session: Session, genre_in: GenreCreate) -> Genre:
    genre = Genre.model_validate(genre_in)
    session.add(genre)
    session.commit()
    session.refresh(genre)
    return genre

def update_genre(*, session: Session, db_genre: Genre, genre_in: GenreUpdate) -> Any:
    db_genre.sqlmodel_update(genre_in)
    session.add(db_genre)
    session.commit()
    session.refresh(db_genre)
    return db_genre

# CRUD operations for Author
def get_author_by_full_name(*, session: Session, first_name: str, family_name: str) -> Author | None:
    statement = select(Author).where((Author.first_name == first_name) & (Author.family_name == family_name))
    author = session.exec(statement).first()
    return author

def create_author(*, session: Session, author_in: AuthorCreate) -> Author:
    author = Author.model_validate(author_in)
    session.add(author)
    session.commit()
    session.refresh(author)
    return author

def update_author(*, session: Session, db_author: Author, author_in: AuthorUpdate) -> Any:
    db_author.sqlmodel_update(author_in)
    session.add(db_author)
    session.commit()
    session.refresh(db_author)
    return db_author

# CRUD operations for Book
def get_book_by_title(*, session: Session, title: str) -> Book | None:
    statement = select(Book).where(Book.title == title)
    book = session.exec(statement).first()
    return book

def create_book(*, session: Session, book_in: BookCreate) -> Book:
    book = Book.model_validate(book_in)
    session.add(book)
    session.commit()
    session.refresh(book)
    return book

def update_book(*, session: Session, db_book: Book, book_in: BookUpdate) -> Any:
    db_book.sqlmodel_update(book_in)
    session.add(db_book)
    session.commit()
    session.refresh(db_book)
    return db_book

