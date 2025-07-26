import { useNavigate } from 'react-router-dom'
import { deleteAuthor } from '../lib/api'

interface DeleteAuthorProps {
  id: number
}

export default function DeleteAuthor({ id }: DeleteAuthorProps) {
  const navigate = useNavigate()

  async function deleteDialog() {
    const conf = confirm("Delete Author?")
    if (conf) {
      const author = await deleteAuthor(id)
      console.log('deleted author with ID: ' + author.id)
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