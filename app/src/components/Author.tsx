import { useState } from 'react'

export interface AuthorType {
  id: number
  first_name: string
  family_name: string
}

interface AuthorProps { 
  authors: AuthorType[]
  selectedId?: number
}

export default function Author({ authors, selectedId}: AuthorProps) {
  const [authorId, setAuthorId] = useState(selectedId)

  return (
    <div className='flex flex-col mb-2'>
      <label className='self-start font-semibold mb-1'>Author</label>
      <select name='author_id' value={authorId} required 
        onChange={e => setAuthorId(Number(e.target.value))}
        className='self-start mb-2 bg-white'>
        <option>----- select -----</option>
        {authors && authors.map((author: AuthorType) => (
          <option key={author.id} value={author.id}>
            {author.first_name}{' '}{author.family_name}
          </option>
        ))}
      </select>
    </div>
  )
}