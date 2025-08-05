import { Link, useParams } from 'react-router-dom'
import { GenreType, getGenre } from '../lib/api'
import DeleteGenre from '../components/DeleteGenre'
import { useQuery } from '@tanstack/react-query'

export default function GenreDetails() {
  const { id } = useParams<{ id: string }>()
  const genreId = parseInt(id!)

  const {isPending, error, data: genre, isFetching } = useQuery<GenreType, Error>({
    queryKey: ['genre', genreId],
    queryFn: () => getGenre(genreId)
  });

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error fetching genre: {error.message}</div>;

  return (
    <>
      <h1 className='text-center m-2'>Genre Details</h1>
      <p className=" text-center mb-2">
        <span className="underline">
          {genre.title}
        </span>
      </p>
      <div className='text-center'>
        <Link to={`/genres/${id}/edit`} className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Edit</Link>
        <DeleteGenre id={parseInt(id!)} />
      </div>
    </>
  )
}