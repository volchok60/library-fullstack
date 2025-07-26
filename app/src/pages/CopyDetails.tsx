import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBookCopy } from '../lib/api'
import FormattedDate from '../components/FormattedDate'
import { getBookCopyStatuses } from '../lib/utils'
import DeleteBookCopy from '../components/DeleteBookCopy'

export default function CopyDetails() {
  const { id } = useParams<{ id: string }>()
  const [bookCopy, setBookCopy] = useState<any>(null)

  useEffect(() => {
    async function fetchBookCopy() {
      if (id) {
        try {
          const data = await getBookCopy(parseInt(id))
          setBookCopy(data)
        } catch (error) {
          console.error('Failed to fetch book copy:', error)
        }
      }
    }

    fetchBookCopy()
  }, [id])

  if (!bookCopy) return <div>Loading...</div>

  const dueDate = bookCopy.due_back?.split('T')[0]
  const book = bookCopy.book
  const author = book.author
  const statuses = getBookCopyStatuses()
  
  return (
    <div className='text-center'>
      <h1 className='text-center m-2'>Book Copy Details</h1>
      <p className="">
        <span>Title: </span>
        {book.title}
      </p>
      <p>
        <span>Author: </span>
        {author.first_name}{' '}{author.family_name}
      </p>
      <p>
        <span>Imprint: </span>
        {bookCopy.imprint}
      </p>
      <p>
        <span>Status: </span>
        {statuses[bookCopy.status]}
      </p>
      {bookCopy.status !== 5 &&
        <p>
          <span>Due Date: </span>
          <FormattedDate dateString={dueDate} />
        </p>
      }
      <Link to={`/copies/${id}/edit`} className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Edit</Link>
      <DeleteBookCopy id={parseInt(id!)} />
    </div>
  )
}