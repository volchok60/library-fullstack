import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../lib/api'

export default function DeleteAuthor({ id }: { id: number }) {
  const navigate = useNavigate()

  async function deleteDialog() {
    const conf = confirm("Delete Author?")
    if (conf) {
      const authorId = await deleteAuthor(id)
      console.log('deleted author with ID: ' + authorId)
      navigate('/authors')
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