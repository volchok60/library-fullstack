import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook, getAuthors, getGenres, updateBook } from '../lib/api'
import Author from '../components/Author'
import Genre from '../components/Genre'
import BookStatus from '../components/BookStatus'

export default function BookEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [book, setBook] = useState<any>(null)
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const [bookData, authorsData, genresData] = await Promise.all([
            getBook(parseInt(id)),
            getAuthors(),
            getGenres()
          ])
          setBook(bookData)
          setAuthors(authorsData)
          setGenres(genresData)
        } catch (error) {
          console.error('Failed to fetch data:', error)
        }
      }
    }

    fetchData()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const str = formData.get('due_date') as string
    const dueDate = str ? new Date(str) : null

    const payload = {
      title: formData.get('title') as string,
      authorId: parseInt(formData.get('author_id') as string),
      genreId: parseInt(formData.get('genre_id') as string),
      summary: formData.get('summary') as string,
      imprint: formData.get('imprint') as string,
      dueBack: dueDate,
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

  if (!book) return <div>Loading...</div>

  const dueDate = book.due_back?.split('T')[0]

  return (
    <div>
      <h1 className='text-center m-2'>Update Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Title:</label>
          <input type="text" name="title" required defaultValue={book.title} />
          
          <Author authors={authors} selectedId={book.author.id} />
          <Genre genres={genres} selectedId={book.genre.id} />

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