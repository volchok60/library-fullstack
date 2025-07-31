import { useNavigate } from 'react-router-dom'
import { deleteGenre } from '../lib/api'

export default function DeleteGenre({ id }: { id: number }) {
  const navigate = useNavigate()

  async function deleteDialog() {
    const conf = confirm("Delete Genre?")
    if (conf) {
      const genreId = await deleteGenre(id)
      console.log('deleted genre with ID: ' + genreId)
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