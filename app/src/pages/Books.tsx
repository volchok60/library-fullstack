import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBooks } from '../lib/api'
import { BookType } from '../components/Book'

export default function Books() {
  const [books, setBooks] = useState<BookType[]>([])

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

  return (
    <>
      <div className="flex justify-between pt-2">
        <h1 className="ml-2">Book List</h1>
        <Link to="/books/create" className="rounded-md bg-cyan-500 text-white hover:bg-blue-500 mr-2 p-2">New Book</Link>
      </div>
      <div className="grid justify-items-center">
        <ul>
          {books && books.map((book: BookType) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`} className="hover:text-blue-500">{book.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}