import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAuthor, getBook } from '../lib/api'
import DeleteBook from '../components/DeleteBook'
import FormattedDate from '../components/FormattedDate'
import { getBookStatuses } from '../lib/utils'

export default function BookDetails() {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<any>(null)
  const [author, setAuthor] = useState<any>(null)

  useEffect(() => {
    async function fetchBook() {
      if (id) {
        try {
          const b = await getBook(parseInt(id))
          setBook(b)
          const a = await getAuthor(b.author_id)
          setAuthor(a)
        } catch (error) {
          console.error('Failed to fetch book details:', error)
        }
      }
    }

    fetchBook()
  }, [])

  if (!book || !author) return <div>Loading Book details...</div>
  
  const dueDate = book.due_back?.split('T')[0]
  const statuses = getBookStatuses()

  return (
    <>
      <h1 className='text-center m-2'>Book Details</h1>
      <p className="mb-2">
        <span>Title: </span>
        <span className="underline">{book.title}</span>
      </p>
      <p>
        <span>Author: </span>
        {author.first_name}{' '}{author.family_name}
      </p>
      <p>
        <span>Imprint: </span>
        {book.imprint}
      </p>
      <p>
        <span>Status: </span>
        {statuses[book.status]}
      </p>
      {book.due_back &&
        <p>
          <span>Due Date: </span>
          <FormattedDate dateString={dueDate} />
        </p>
      }
      <p>
        {book.summary}
      </p>  
      <div className='text-center'>
        <Link to={`/books/${id}/edit`} className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Edit</Link>
        <DeleteBook id={parseInt(id!)} />
      </div>
    </>
  )
}