import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthors, getGenres, createBook } from '../lib/api'
import Author from '../components/Author'
import Genre from '../components/Genre'
import BookStatus from '../components/BookStatus'

export default function BookCreate() {
  const navigate = useNavigate()
  const [authors, setAuthors] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    authorId: '',
    genreId: '',
    summary: '',
    dueDate: '',
    imprint: '',
    status: 5, // Default status
    isbn: ''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [{data: authorsData, count: authorsCount}, {data: genresData, count: genresCount}] = await Promise.all([
          getAuthors(),
          getGenres()
        ])
        console.log('Authors: ', authorsData)
        setAuthors(authorsData)
        setGenres(genresData)
      } catch (err: Error | any) {
        setError(err);
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures it runs only once on mount

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const str = formData.dueDate
    const dueDate = str ? new Date(str) : null

    const payload = {
      title: formData.title,
      author_id: parseInt(formData.authorId),
      genre_id: parseInt(formData.genreId),
      summary: formData.summary,
      imprint: formData.imprint,
      due_back: dueDate,
      status: formData.status,
      isbn: formData.isbn
    }

    try {
      await createBook(payload)
      navigate('/books')
    } catch (error) {
      console.error('Failed to create book:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className='text-center m-2'>New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>Title:</label>
          <input type="text" name="title" required value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})} />

          <Author authors={authors} />
          <Genre genres={genres} />

          <label className='sm:text-end'>Imprint:</label>
          <input type="text" name="imprint" required value={formData.imprint}
            onChange={e => setFormData({...formData, imprint: e.target.value})} />

          <BookStatus />

          <label className='sm:text-end'>ISBN:</label>
          <input type="text" name="isbn" required value={formData.isbn}
            onChange={e => setFormData({...formData, isbn: e.target.value})} />
          
          <label className='sm:text-end'>Due Date:</label>
          <input type="date" name="due_date" value={formData.dueDate}
            onChange={e => setFormData({...formData, dueDate: e.target.value})} />

          <label className='sm:text-end'>Summary:</label>
          <textarea name="summary" rows={10} cols={50} required value={formData.summary}
            onChange={e => setFormData({...formData, summary: e.target.value})} />
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