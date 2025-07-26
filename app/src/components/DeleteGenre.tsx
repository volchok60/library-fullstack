import { useNavigate } from 'react-router-dom'
import { deleteGenre } from '../lib/api'

interface DeleteGenreProps {
  id: number
}

export default function DeleteGenre({ id }: DeleteGenreProps) {
  const navigate = useNavigate()

  async function deleteDialog() {
    const conf = confirm("Delete Genre?")
    if (conf) {
      const genre = await deleteGenre(id)
      console.log('deleted genre with ID: ' + genre.id)
      navigate('/genres')
    }
  }
    
  return (
    <button 
      onClick={deleteDialog} 
      className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'
    >
      Delete
    </button>
  )
}