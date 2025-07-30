/*
  # Library Management System Database Schema

  1. New Tables
    - `authors`
      - `id` (integer, primary key, auto-increment)
      - `first_name` (text, required)
      - `family_name` (text, required)
      - `birth_date` (date, optional)
      - `death_date` (date, optional)
      - `life_span` (text, optional)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

    - `genres`
      - `id` (integer, primary key, auto-increment)
      - `name` (text, required, unique)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

    - `books`
      - `id` (integer, primary key, auto-increment)
      - `title` (text, required)
      - `author_id` (integer, foreign key to authors)
      - `genre_id` (integer, foreign key to genres)
      - `summary` (text, optional)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

    - `book_copies`
      - `id` (integer, primary key, auto-increment)
      - `book_id` (integer, foreign key to books)
      - `imprint` (text, optional)
      - `due_back` (date, optional)
      - `status` (integer, default 5) -- 1: Maintenance, 2: On loan, 3: Available, 4: Reserved, 5: In Library
      - `isbn` (text, optional)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to perform CRUD operations
    - Add policies for anonymous users to read data (for public library catalog)

  3. Indexes
    - Add indexes on foreign keys for better query performance
    - Add index on book title for search functionality
*/

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  family_name TEXT NOT NULL,
  birth_date DATE,
  death_date DATE,
  life_span TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create genres table
CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create book_copies table
CREATE TABLE IF NOT EXISTS book_copies (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  imprint TEXT,
  due_back DATE,
  status INTEGER DEFAULT 5, -- 1: Maintenance, 2: On loan, 3: Available, 4: Reserved, 5: In Library
  isbn TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_books_author_id ON books(author_id);
CREATE INDEX IF NOT EXISTS idx_books_genre_id ON books(genre_id);
CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_book_copies_book_id ON book_copies(book_id);
CREATE INDEX IF NOT EXISTS idx_book_copies_status ON book_copies(status);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_copies ENABLE ROW LEVEL SECURITY;

-- Create policies for authors table
CREATE POLICY "Anyone can read authors"
  ON authors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert authors"
  ON authors
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON authors
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete authors"
  ON authors
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for genres table
CREATE POLICY "Anyone can read genres"
  ON genres
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert genres"
  ON genres
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update genres"
  ON genres
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete genres"
  ON genres
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for books table
CREATE POLICY "Anyone can read books"
  ON books
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert books"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update books"
  ON books
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete books"
  ON books
  FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for book_copies table
CREATE POLICY "Anyone can read book copies"
  ON book_copies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert book copies"
  ON book_copies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update book copies"
  ON book_copies
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete book copies"
  ON book_copies
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert some sample data for testing
INSERT INTO authors (first_name, family_name, birth_date, death_date, life_span) VALUES
  ('Jane', 'Austen', '1775-12-16', '1817-07-18', '1775-1817'),
  ('Charles', 'Dickens', '1812-02-07', '1870-06-09', '1812-1870'),
  ('William', 'Shakespeare', '1564-04-26', '1616-04-23', '1564-1616'),
  ('George', 'Orwell', '1903-06-25', '1950-01-21', '1903-1950'),
  ('J.K.', 'Rowling', '1965-07-31', NULL, '1965-')
ON CONFLICT DO NOTHING;

INSERT INTO genres (name) VALUES
  ('Fiction'),
  ('Classic Literature'),
  ('Fantasy'),
  ('Science Fiction'),
  ('Mystery'),
  ('Romance'),
  ('Historical Fiction'),
  ('Young Adult'),
  ('Drama'),
  ('Poetry')
ON CONFLICT (name) DO NOTHING;

INSERT INTO books (title, author_id, genre_id, summary) VALUES
  ('Pride and Prejudice', 1, 2, 'A romantic novel about Elizabeth Bennet and Mr. Darcy.'),
  ('Great Expectations', 2, 2, 'The story of Pip, an orphan who rises from humble beginnings.'),
  ('Romeo and Juliet', 3, 9, 'A tragic love story between two young star-crossed lovers.'),
  ('1984', 4, 4, 'A dystopian novel about totalitarian control and surveillance.'),
  ('Harry Potter and the Philosopher''s Stone', 5, 3, 'A young wizard discovers his magical heritage.')
ON CONFLICT DO NOTHING;

INSERT INTO book_copies (book_id, imprint, status, isbn) VALUES
  (1, 'Penguin Classics', 5, '978-0141439518'),
  (1, 'Oxford World''s Classics', 5, '978-0199535569'),
  (2, 'Penguin Classics', 5, '978-0141439563'),
  (3, 'Folger Shakespeare Library', 5, '978-0743477116'),
  (4, 'Penguin Modern Classics', 2, '978-0141036144'),
  (5, 'Bloomsbury', 5, '978-0747532699')
ON CONFLICT DO NOTHING;