import { useNavigate } from 'react-router-dom'
import { deleteBook } from '../lib/api'

interface DeleteBookProps {
  id: number
}

export default function DeleteBook({ id }: DeleteBookProps) {
  const navigate = useNavigate()

  async function deleteDialog() {
    const conf = confirm("Delete Book?")
    if (conf) {
      const book = await deleteBook(id)
      console.log('deleted book with ID: ' + book.id)
      navigate('/books')
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