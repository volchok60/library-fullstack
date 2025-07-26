import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBooks, createBookCopy } from '../lib/api'
import Book from '../components/Book'
import BookCopyStatus from '../components/BookCopyStatus'

export default function CopyCreate() {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks()
        setBooks(data)
      } catch (error) {
        console.error('Failed to fetch books:', error)
      }
    }

    fetchBooks()
  }, [])

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
      await createBookCopy(payload)
      navigate('/copies')
    } catch (error) {
      console.error('Failed to create book copy:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2'>New Book Copy</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <Book books={books} />

          <label className='sm:text-end'>Imprint:</label>
          <input type="text" name="imprint" required />

          <BookCopyStatus />

          <label className='sm:text-end'>ISBN:</label>
          <input type="text" name="isbn" required />
          
          <label className='sm:text-end'>Due Date:</label>
          <input type="date" name="due_date" />
        </div>
        <div className='text-center'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>
            Create
          </button>
        </div>
      </form>
    </div>
  )
}