import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAuthor } from '../lib/api'
import FormattedDate from '../components/FormattedDate'
import DeleteAuthor from '../components/DeleteAuthor'

export default function AuthorDetails() {
  const { id } = useParams<{ id: string }>()
  const [author, setAuthor] = useState<any>(null)

  useEffect(() => {
    async function fetchAuthor() {
      if (id) {
        try {
          const data = await getAuthor(parseInt(id))
          setAuthor(data)
        } catch (error) {
          console.error('Failed to fetch author:', error)
        }
      }
    }

    fetchAuthor()
  }, [id])

  if (!author) return <div>Loading...</div>

  const birthDate = author.birth_date?.split('T')[0]
  const deathDate = author.death_date?.split("T")[0]

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