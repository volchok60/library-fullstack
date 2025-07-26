import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBookCopies } from '../lib/api'

interface BookCopyType {
  id: number
  book: {
    title: string
  }
}

export default function Copies() {
  const [bookCopies, setBookCopies] = useState<BookCopyType[]>([])

  useEffect(() => {
    async function fetchBookCopies() {
      try {
        const data = await getBookCopies()
        setBookCopies(data)
      } catch (error) {
        console.error('Failed to fetch book copies:', error)
      }
    }

    fetchBookCopies()
  }, [])

  return (
    <>
      <div className="flex justify-between pt-2">
        <h1 className="ml-2">Book Copy List</h1>
        <Link to='/copies/create' className="rounded-md bg-cyan-500 text-white hover:bg-blue-500 mr-2 p-2">New Book Copy</Link>
      </div>
      <div className="grid justify-items-center">  
        <ul>
          {bookCopies && bookCopies.map((bookCopy: BookCopyType) => (
            <li key={bookCopy.id}>
              <Link to={`/copies/${bookCopy.id}`} className="hover:text-blue-500">
                {bookCopy.book.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}