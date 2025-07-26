import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAuthor, updateAuthor } from '../lib/api'

export default function AuthorEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    birthDate: '',
    deathDate: '',
    lifeSpan: ''
  })

  useEffect(() => {
    async function fetchAuthor() {
      if (id) {
        try {
          const author = await getAuthor(parseInt(id))
          setFormData({
            firstName: author.first_name,
            familyName: author.family_name,
            birthDate: author.birth_date?.split('T')[0] || '',
            deathDate: author.death_date?.split('T')[0] || '',
            lifeSpan: author.life_span
          })
        } catch (error) {
          console.error('Failed to fetch author:', error)
        }
      }
    }

    fetchAuthor()
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      firstName: formData.firstName,
      familyName: formData.familyName,
      birthDate: new Date(formData.birthDate),
      deathDate: formData.deathDate ? new Date(formData.deathDate) : null,
      lifeSpan: formData.lifeSpan
    }

    try {
      await updateAuthor(parseInt(id!), payload)
      navigate('/authors')
    } catch (error) {
      console.error('Failed to update author:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2'>Update Author</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <label className='sm:text-end'>First Name:</label>
          <input 
            type="text" 
            required 
            value={formData.firstName}
            onChange={e => setFormData({...formData, firstName: e.target.value})}
          />
          
          <label className='sm:text-end'>Family Name:</label>
          <input 
            type="text" 
            required 
            value={formData.familyName}
            onChange={e => setFormData({...formData, familyName: e.target.value})}
          />
          
          <label className='sm:text-end'>Birth Date:</label>
          <input 
            type="date" 
            required 
            value={formData.birthDate}
            onChange={e => setFormData({...formData, birthDate: e.target.value})}
          />
          
          <label className='sm:text-end'>Death Date:</label>
          <input 
            type="date" 
            value={formData.deathDate}
            onChange={e => setFormData({...formData, deathDate: e.target.value})}
          />
          
          <label className='sm:text-end'>Life Span:</label>
          <textarea 
            rows={20} 
            cols={50} 
            required 
            value={formData.lifeSpan}
            onChange={e => setFormData({...formData, lifeSpan: e.target.value})}
          />
        </div>
        <div className='text-center'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 m-2 px-2'>
            Update
          </button>
        </div>
      </form>
    </div>
  )
}