import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GenreType, getGenre, updateGenre } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

export default function GenreEdit() {
  const { id } = useParams<{ id: string }>()
  const genreId = parseInt(id!)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ title: '' })

  const {isPending, error, data: genre, isFetching } = useQuery<GenreType, Error>({
    queryKey: ['genre', genreId],
    queryFn: () => getGenre(genreId)
  });

  useEffect(() => {
    if (genre) {
      setFormData({ title: genre.title })
    }
  } , [genre])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = { title: formData.title }

    try {
      await updateGenre(parseInt(id!), payload)
      navigate('/genres')
    } catch (error) {
      console.error('Failed to update genre:', error)
    }
  }
  
  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error fetching genre: {error.message}</div>;
  
  return (
    <div>
      <h1 className='text-center m-2'>Update Genre</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Name:</label>
          <input 
            type='text' 
            required 
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
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