import { useNavigate, useParams } from 'react-router-dom'
import { getBook, getAuthors, getGenres, updateBook, getAuthor, getGenre, AuthorType, GenreType, BookType } from '../lib/api'
import Author from '../components/Author'
import Genre from '../components/Genre'
import BookStatus from '../components/BookStatus'
import { useQuery } from '@tanstack/react-query'

export default function BookEdit() {
  const { id } = useParams<{ id: string }>()
  const bookId = parseInt(id!)
  const navigate = useNavigate()

  const {isPending: bookLoading, error: bookError, data: book, isFetching } = useQuery<BookType, Error>({
    queryKey: ['book', bookId],
    queryFn: () => getBook(bookId)
  });

  const authorId = book?.author_id
  const {isPending: authorloading, error: authorError, data: author } = useQuery<AuthorType, Error>({
    queryKey: ['author', authorId],
    queryFn: () => getAuthor(authorId!),
    enabled: !!authorId, // Only fetch author if book is loaded
  });

  const genreId = book?.genre_id
  const {isPending: genreLoading, error: genreError, data: genre } = useQuery<GenreType, Error>({
    queryKey: ['genre', genreId],
    queryFn: () => getGenre(genreId!),
    enabled: !!genreId, // Only fetch genre if book is loaded
  });

  const {isPending: authorsloading, error: authorsError, data: authorsData } = useQuery<{ authors: AuthorType[], count: number }, Error>({
    queryKey: ['authors'],
    queryFn: () => getAuthors()
  });

  const {isPending: genresLoading, error: genresError, data: genresData} = useQuery<{ genres: GenreType[], count: number }, Error>({
    queryKey: ['genres'],
    queryFn: () => getGenres()
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const str = formData.get('due_date') as string
    const dueDate = str ? new Date(str) : null

    const payload = {
      title: formData.get('title') as string,
      author_id: parseInt(formData.get('author_id') as string),
      genre_id: parseInt(formData.get('genre_id') as string),
      summary: formData.get('summary') as string,
      imprint: formData.get('imprint') as string,
      due_back: dueDate,
      status: parseInt(formData.get('status') as string),
      isbn: formData.get('isbn') as string
    }

    try {
      await updateBook(parseInt(id!), payload)
      navigate('/books')
    } catch (error) {
      console.error('Failed to update book:', error)
    }
  }

  if (bookLoading || authorloading || genreLoading || authorsloading || genresLoading) return <div>Loading Book details...</div>

  if (bookError) return <div>Error fetching book: {bookError.message}</div>;
  if (authorError) return <div>Error fetching author: {authorError.message}</div>;
  if (genreError) return <div>Error fetching genre: {genreError.message}</div>;
  if (authorsError) return <div>Error fetching authors: {authorsError.message}</div>;
  if (genresError) return <div>Error fetching genres: {genresError.message}</div>;

  const dueDate = book.due_back?.toString()
  const authors = authorsData ? authorsData.authors : []
  const genres = genresData ? genresData.genres : []

  return (
    <div>
      <h1 className='text-center m-2'>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Title:</label>
          <input type="text" name="title" required defaultValue={book.title} />
          
          <Author authors={authors} selectedId={author.id} />
          <Genre genres={genres} selectedId={genre.id} />

          <label className='sm:text-end'>Imprint:</label>
          <input type="text" name="imprint" required defaultValue={book.imprint} />

          <BookStatus selectedId={book.status} />

          <label className='sm:text-end'>ISBN:</label>
          <input type="text" name="isbn" required defaultValue={book.isbn} />
          
          <label className='sm:text-end'>Due Date:</label>
          <input type="date" name="due_date" defaultValue={dueDate} />

          <label className='sm:text-end'>Summary:</label>
          <textarea name="summary" rows={10} cols={50} required defaultValue={book.summary} />
        </div>
        <div className='text-center'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}