import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getGenre, updateGenre } from '../lib/api'

export default function GenreEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [name, setName] = useState('')

  useEffect(() => {
    async function fetchGenre() {
      if (id) {
        try {
          const genre = await getGenre(parseInt(id))
          setName(genre.name)
        } catch (error) {
          console.error('Failed to fetch genre:', error)
        }
      }
    }

    fetchGenre()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = { name }

    try {
      await updateGenre(parseInt(id!), payload)
      navigate('/genres')
    } catch (error) {
      console.error('Failed to update genre:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2'>Update Genre</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Name:</label>
          <input 
            type='text' 
            required 
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='text-center'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}