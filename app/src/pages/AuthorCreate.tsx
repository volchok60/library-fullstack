import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAuthor } from '../lib/api'

export default function AuthorCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    birthDate: '',
    deathDate: '',
    lifeSpan: ''
  })

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
      await createAuthor(payload)
      navigate('/authors')
    } catch (error) {
      console.error('Failed to create author:', error)
    }
  }

  return (
    <div>
      <h1 className='text-center m-2 font-bold p-4 text-lg'>New Author</h1>
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
            rows={20} cols={50} required 
            value={formData.lifeSpan}
            onChange={e => setFormData({...formData, lifeSpan: e.target.value})}
            className='self-start mb-2 resize-none' maxLength={1000}
          />
        </div>
        <div className='text-center m-2'>
          <button type="submit" className='rounded-md bg-cyan-500 text-white hover:bg-blue-500 px-4 py-2'>Create</button>
        </div>
      </form>
    </div>
  )
}