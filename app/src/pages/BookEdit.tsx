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
      <h1 className='text-center m-2 font-bold p-4 text-lg'>Update Book</h1>
      <form onSubmit={handleSubmit} className='p-4'>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Title</label>
          <input type="text" name="title" required defaultValue={book.title}
            className='self-start mb-2' maxLength={255} />
        </div>          
        <Author authors={authors} selectedId={author.id} />
        <Genre genres={genres} selectedId={genre.id} />
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Imprint</label>
          <input type="text" name="imprint" required defaultValue={book.imprint}
            className='self-start mb-2' maxLength={255} />
        </div>
        <BookStatus selectedId={book.status} />
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>ISBN</label>
          <input type="text" name="isbn" required defaultValue={book.isbn}
            className='self-start mb-2' maxLength={13} />
        </div>            
        <div className='flex flex-col mb-2'>          
          <label className='self-start font-semibold mb-1'>Due Date</label>
          <input type="date" name="due_date" defaultValue={dueDate} className='self-start mb-2' />
        </div>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Summary</label>
          <textarea name="summary" rows={10} cols={50} required defaultValue={book.summary}
            className='self-start mb-2 resize-none' maxLength={2000} />
        </div>
        <div className='text-center m-2'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 px-4 py-2'>Update</button>
        </div>
      </form>
    </div>
  )
}