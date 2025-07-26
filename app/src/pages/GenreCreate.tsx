import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGenre } from '../lib/api'

export default function GenreCreate() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = { name }

    try {
      await createGenre(payload)
      navigate('/genres')
    } catch (error) {
      console.error('Failed to create genre:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2'>New Genre</h1>
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
            Create
          </button>
        </div>
      </form>
    </div>
  )
}