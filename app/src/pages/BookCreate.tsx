import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthors, getGenres, createBook } from '../lib/api'
import BookStatus from '../components/BookStatus'
import { AuthorType, GenreType } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

export default function BookCreate() {
  const navigate = useNavigate()
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

  const {isPending: authorsloading, error: authorsError, data: authorsData } = useQuery<{ authors: AuthorType[], count: number }, Error>({
    queryKey: ['authors'],
    queryFn: () => getAuthors()
  });

  const {isPending: genresLoading, error: genresError, data: genresData} = useQuery<{ genres: GenreType[], count: number }, Error>({
    queryKey: ['genres'],
    queryFn: () => getGenres()
  });

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
    console.log('Create book request: ', payload)

    try {
      await createBook(payload)
      navigate('/books')
    } catch (error) {
      console.error('Failed to create book:', error)
    }
  }

  if (authorsError) return <div>Error fetching authors: {authorsError.message}</div>;
  if (genresError) return <div>Error fetching genres: {genresError.message}</div>;

  if (authorsloading || genresLoading) {
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

  const authors = authorsData ? authorsData.authors : []
  const genres = genresData ? genresData.genres : []

  return (
    <div>
      <h1 className='text-center m-2 font-bold p-4 text-lg'>New Book</h1>
      <form onSubmit={handleSubmit} className='p-4'>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Title</label>
          <input type="text" name="title" required value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            className='self-start mb-2' maxLength={255}/>
        </div>  
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Author</label>
          <select name='author_id' value={formData.authorId} required 
            onChange={e => setFormData({...formData, authorId: e.target.value})}
            className='self-start mb-2 bg-white'>
            <option>----- select -----</option>
            {authors && authors.map((author: AuthorType) => (
              <option key={author.id} value={author.id}>
                {author.first_name}{' '}{author.family_name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Genre</label>
          <select name='genre_id' value={formData.genreId} required 
            onChange={e => setFormData({...formData,  genreId: e.target.value})}
            className='self-start mb-2 bg-white'>
            <option>----- select -----</option>
            {genres && genres.map((genre: GenreType) => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Imprint</label>
          <input type="text" name="imprint" required value={formData.imprint}
            onChange={e => setFormData({...formData, imprint: e.target.value})} 
            className='self-start mb-2' maxLength={255} />
        </div>
        <BookStatus />
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>ISBN</label>
          <input type="text" name="isbn" required value={formData.isbn}
            onChange={e => setFormData({...formData, isbn: e.target.value})} 
            className='self-start mb-2' maxLength={13}/>
        </div>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Due Date</label>
          <input type="date" name="due_date" value={formData.dueDate}
            onChange={e => setFormData({...formData, dueDate: e.target.value})} 
            className='self-start mb-2'/>
        </div>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>Summary</label>
          <textarea name="summary" rows={10} cols={50} required value={formData.summary}
            onChange={e => setFormData({...formData, summary: e.target.value})} 
            className='self-start mb-2 resize-none' maxLength={2000}/>
        </div>
        <div className='text-center m-2'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 px-4 py-2'>Create</button>
        </div>
      </form>
    </div>
  )
}