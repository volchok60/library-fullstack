import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthorType, getAuthor, updateAuthor } from '../lib/api'
import { useQuery } from '@tanstack/react-query'

export default function AuthorEdit() {
  const { id } = useParams<{ id: string }>()
  const authorId = parseInt(id!)

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    birthDate: '',
    deathDate: '',
    lifeSpan: ''
  })

  const {isPending, error, data: author, isFetching } = useQuery<AuthorType, Error>({
    queryKey: ['author', authorId],
    queryFn: () => getAuthor(authorId)
  });
  
  useEffect(() => {
    if (author) {
      setFormData({
        firstName: author.first_name,
        familyName: author.family_name,
        birthDate: author.birth_date.toString(),
        deathDate: author.death_date?.toString() || '',
        lifeSpan: author.life_span
      })
    }
  }, [author])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      first_name: formData.firstName,
      family_name: formData.familyName,
      birth_date: new Date(formData.birthDate),
      death_date: formData.deathDate ? new Date(formData.deathDate) : null,
      life_span: formData.lifeSpan
    }

    try {
      await updateAuthor(parseInt(id!), payload)
      navigate('/authors')
    } catch (error) {
      console.error('Failed to update author:', error)
    }
  }

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching author: {error.message}</div>;

  return (
    <div>
      <h1 className='text-center m-2 font-bold p-4 text-lg'>Update Author</h1>
      <form onSubmit={handleSubmit} className='p-4'>
        <div className='flex flex-col mb-2'>
          <label className='self-start font-semibold mb-1'>First Name</label>
          <input 
            type="text" required 
            value={formData.firstName}
            onChange={e => setFormData({...formData, firstName: e.target.value})}
            className='self-start mb-2' maxLength={255}
          />
        </div>
        <div className='flex flex-col mb-2'>          
          <label className='self-start font-semibold mb-1'>Family Name</label>
          <input 
            type="text" required 
            value={formData.familyName}
            onChange={e => setFormData({...formData, familyName: e.target.value})}
            className='self-start mb-2' maxLength={255}
          />
        </div>
        <div className='flex flex-col mb-2'>          
          <label className='self-start font-semibold mb-1'>Birth Date</label>
          <input 
            type="date" required 
            value={formData.birthDate}
            onChange={e => setFormData({...formData, birthDate: e.target.value})}
            className='self-start mb-2'
          />
        </div>
        <div className='flex flex-col mb-2'>          
          <label className='self-start font-semibold mb-1'>Death Date</label>
          <input 
            type="date" 
            value={formData.deathDate}
            onChange={e => setFormData({...formData, deathDate: e.target.value})}
            className='self-start mb-2'
          />
        </div>
        <div className='flex flex-col mb-2'>          
          <label className='self-start font-semibold mb-1'>Life Span</label>
          <textarea 
            rows={10} cols={50} required 
            value={formData.lifeSpan}
            onChange={e => setFormData({...formData, lifeSpan: e.target.value})}
            className='self-start mb-2 resize-none' maxLength={1000}
          />
        </div>
        <div className='text-center m-2'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 px-4 py-2'>Update</button>
        </div>
      </form>
    </div>
  )
}