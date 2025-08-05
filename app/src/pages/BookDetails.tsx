import { Link, useParams } from 'react-router-dom'
import { AuthorType, BookType, getAuthor, getBook } from '../lib/api'
import DeleteBook from '../components/DeleteBook'
import FormattedDate from '../components/FormattedDate'
import { getBookStatuses } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

export default function BookDetails() {
  const { id } = useParams<{ id: string }>()
  const bookId = parseInt(id!)

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

  if (bookLoading || authorloading) return <div>Loading Book details...</div>

  if (bookError) return <div>Error fetching book: {bookError.message}</div>;
  if (authorError) return <div>Error fetching author: {authorError.message}</div>;
  
  const dueDate = book.due_back ? book.due_back.toString() : ''
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