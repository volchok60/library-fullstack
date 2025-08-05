import { Link, useParams } from 'react-router-dom'
import { AuthorType, getAuthor } from '../lib/api'
import FormattedDate from '../components/FormattedDate'
import DeleteAuthor from '../components/DeleteAuthor'
import { useQuery } from '@tanstack/react-query'

export default function AuthorDetails() {
  const { id } = useParams<{ id: string }>()
  const authorId = parseInt(id!)

  const {isPending, error, data: author, isFetching } = useQuery<AuthorType, Error>({
    queryKey: ['author', authorId],
    queryFn: () => getAuthor(authorId)
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching author: {error.message}</div>;

  const birthDate = author.birth_date.toString()
  const deathDate = author.death_date?.toString()

  return (
    <>
      <h1 className='text-center m-2'>Author Details</h1>
      <div>
        <p className="mb-2">
          <span className="underline">
            {author.first_name}{' '}{author.family_name}
          </span>
          <span> ( </span>
          <FormattedDate dateString={birthDate} />
          <span> - </span>
          {deathDate ? (<FormattedDate dateString={deathDate} />) : ('Alive')}
          <span> ) </span>
        </p>
        <p>
          {author.life_span}
        </p>
      </div>
      <div className='text-center'>
        <Link to={`/authors/${id}/edit`} className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Edit</Link>
        <DeleteAuthor id={parseInt(id!)} />
      </div>
    </>
  )
}