import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthors, getGenres, createBook } from '../lib/api'
import Author from '../components/Author'
import Genre from '../components/Genre'

export default function BookCreate() {
  const navigate = useNavigate()
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    genreId: '',
    summary: ''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [authorsData, genresData] = await Promise.all([
          getAuthors(),
          getGenres()
        ])
        setAuthors(authorsData)
        setGenres(genresData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const payload = {
      title: formData.get('title'),
      authorId: parseInt(formData.get('author_id') as string),
      genreId: parseInt(formData.get('genre_id') as string),
      summary: formData.get('summary')
    }

    try {
      await createBook(payload)
      navigate('/books')
    } catch (error) {
      console.error('Failed to create book:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2'>New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Title:</label>
          <input type="text" name="title" required />

          <Author authors={authors} />
          <Genre genres={genres} />

          <label className='sm:text-end'>Summary:</label>
          <textarea name="summary" rows={10} cols={50} required />
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