import uuid
from datetime import date, datetime
from pydantic import EmailStr
from pydantic_extra_types.isbn import ISBN
from sqlmodel import Field, Relationship, SQLModel

# User model definitions

# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = Field(default=None, max_length=255)

# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)

class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)
    full_name: str | None = Field(default=None, max_length=255)

# Properties to receive via API on update, all are optional
class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=255)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)

class UserUpdateMe(SQLModel):
    full_name: str | None = Field(default=None, max_length=255)
    email: EmailStr | None = Field(default=None, max_length=255)

class UpdatePassword(SQLModel):
    current_password: str = Field(min_length=8, max_length=40)
    new_password: str = Field(min_length=8, max_length=40)

# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str

# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: uuid.UUID

class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

# Genre model definitions
class GenreBase(SQLModel):
    name: str = Field(unique=True, index=True, max_length=255)

class GenreCreate(GenreBase):
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class GenreUpdate(GenreBase):
    name: str = Field(max_length=255)
    updated_at: datetime = Field(default_factory=datetime.now)  

class Genre(GenreBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    books: list["Book"] = Relationship(back_populates="genre", cascade_delete=True)

class GenrePublic(GenreBase):
    id: uuid.UUID

class GenresPublic(SQLModel):   
    data: list[GenrePublic]
    count: int

# Author model definitions
class AuthorBase(SQLModel):
    first_name: str = Field(max_length=255)
    family_name: str = Field(max_length=255)
    birth_date: date
    death_date: date | None = Field(default=None)
    life_span: str | None = Field(default=None, max_length=1000)

class AuthorCreate(AuthorBase):
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class AuthorUpdate(AuthorBase):
    first_name: str | None = Field(default=None, max_length=255)
    family_name: str | None = Field(default=None, max_length=255)
    birth_date: date | None = Field(default=None)
    death_date: date | None = Field(default=None)
    life_span: str | None = Field(default=None, max_length=1000)
    updated_at: datetime = Field(default_factory=datetime.now)

class Author(AuthorBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    books: list["Book"] = Relationship(back_populates="author", cascade_delete=True)

class AuthorPublic(AuthorBase):
    id: uuid.UUID

class AuthorsPublic(SQLModel):
    data: list[AuthorPublic]
    count: int

# Book model definitions
class BookBase(SQLModel):
    title: str = Field(max_length=255)
    summary: str | None = Field(default=None, max_length=1000)
    imprint: str | None = Field(default=None, max_length=255)
    due_back: date | None = Field(default=None)
    status: int = Field(default=5)  # 1: Maintenance, 2: On loan, 3: Available, 4: Reserved, 5: In Library
    isbn: ISBN | None = Field(default=None, max_length=13)

class BookCreate(BookBase):
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class BookUpdate(BookBase):
    title: str | None = Field(default=None, max_length=255)
    imprint: str | None = Field(default=None, max_length=255)
    due_back: date | None = Field(default=None)
    status: int = Field(default=5)  # 1: Maintenance, 2: On loan, 3: Available, 4: Reserved, 5: In Library
    isbn: ISBN | None = Field(default=None, max_length=13)
    summary: str | None = Field(default=None, max_length=1000)
    updated_at: datetime = Field(default_factory=datetime.now)

class Book(BookBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    author_id: uuid.UUID = Field(
        foreign_key="author.id", nullable=False, ondelete="CASCADE"
    )
    author: Author | None = Relationship(back_populates="books") 
    genre_id: uuid.UUID = Field(
        foreign_key="genre.id", nullable=False, ondelete="CASCADE"
    )
    genre: Genre | None = Relationship(back_populates="books")

class BookPublic(BookBase):
    id: uuid.UUID
    author_id: uuid.UUID
    genre_id: uuid.UUID

class BooksPublic(SQLModel):
    data: list[BookPublic]
    count: int

# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: str | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(min_length=8, max_length=40)
