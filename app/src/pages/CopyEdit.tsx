import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBooks, getBookCopy, updateBookCopy } from '../lib/api'
import Book from '../components/Book'
import BookCopyStatus from '../components/BookCopyStatus'

export default function CopyEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [bookCopy, setBookCopy] = useState<any>(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const [bookCopyData, booksData] = await Promise.all([
            getBookCopy(parseInt(id)),
            getBooks()
          ])
          setBookCopy(bookCopyData)
          setBooks(booksData)
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
      bookId: parseInt(formData.get('book_id') as string),
      imprint: formData.get('imprint'),
      dueBack: dueDate,
      status: parseInt(formData.get('status') as string),
      isbn: formData.get('isbn')
    }

    try {
      await updateBookCopy(parseInt(id!), payload)
      navigate('/copies')
    } catch (error) {
      console.error('Failed to update book copy:', error)
    }
  }

  if (!bookCopy) return <div>Loading...</div>

  const dueDate = bookCopy.due_back?.split('T')[0]

  return (
    <div>
      <h1 className='text-center m-2'>Update Book Copy</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <Book books={books} selectedId={bookCopy.book.id} />

          <label className='sm:text-end'>Imprint:</label>
          <input type="text" name="imprint" required defaultValue={bookCopy.imprint} />

          <BookCopyStatus selectedId={bookCopy.status} />

          <label className='sm:text-end'>ISBN:</label>
          <input type="text" name="isbn" required defaultValue={bookCopy.isbn} />
          
          <label className='sm:text-end'>Due Date:</label>
          <input type="date" name="due_date" defaultValue={dueDate} />
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