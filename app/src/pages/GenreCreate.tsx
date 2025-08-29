import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createGenre } from '../lib/api'

export default function GenreCreate() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = { title }

    try {
      await createGenre(payload)
      navigate('/genres')
    } catch (error) {
      console.error('Failed to create genre:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2 font-bold p-4 text-lg'>New Genre</h1>
      <form onSubmit={handleSubmit} className='p-4'>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Name</label>
          <input 
            type='text' required 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='self-start mb-2' maxLength={255}
          />
        </div>
        <div className='text-center m-2'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 px-4 py-2'>Create</button>
        </div>
      </form>
    </div>
  )
}