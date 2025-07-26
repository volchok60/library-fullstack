import { useNavigate } from 'react-router-dom'
import { deleteBookCopy } from '../lib/api'

interface DeleteBookCopyProps {
  id: number
}

export default function DeleteBookCopy({ id }: DeleteBookCopyProps) {
  const navigate = useNavigate()

  async function deleteDialog() {
    const conf = confirm("Delete Book Copy?")
    if (conf) {
      const bookCopy = await deleteBookCopy(id)
      console.log('deleted bookCopy with ID: ' + bookCopy.id)
      navigate('/copies')
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