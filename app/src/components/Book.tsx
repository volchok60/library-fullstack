import { useState } from 'react'

export interface BookType {
  id: number
  title: string
}

interface BookProps { 
  books: BookType[]
  selectedId?: number
}

export default function Book({ books, selectedId}: BookProps) {
  const [bookId, setBookId] = useState(selectedId)

  return (
    <>
      <label className='sm:text-end'>Book:</label>
      <select name='book_id' value={bookId} required onChange={e => setBookId(Number(e.target.value))}>
        <option>----- select -----</option>
        {books && books.map((book: BookType) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </select>
    </>
  )
}