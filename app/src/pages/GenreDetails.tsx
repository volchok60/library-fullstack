import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGenre } from '../lib/api'
import DeleteGenre from '../components/DeleteGenre'

export default function GenreDetails() {
  const { id } = useParams<{ id: string }>()
  const [genre, setGenre] = useState<any>(null)

  useEffect(() => {
    async function fetchGenre() {
      if (id) {
        try {
          const data = await getGenre(parseInt(id))
          setGenre(data)
        } catch (error) {
          console.error('Failed to fetch genre:', error)
        }
      }
    }

    fetchGenre()
  }, [id])

  if (!genre) return <div>Loading...</div>

  return (
    <>
      <h1 className='text-center m-2'>Genre Details</h1>
      <p className=" text-center mb-2">
        <span className="underline">
          {genre.name}
        </span>
      </p>
      <div className='text-center'>
        <Link to={`/genres/${id}/edit`} className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>Edit</Link>
        <DeleteGenre id={parseInt(id!)} />
      </div>
    </>
  )
}