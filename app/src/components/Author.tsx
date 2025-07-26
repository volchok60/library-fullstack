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
    <>
      <label className='sm:text-end'>Author:</label>
      <select name='author_id' value={authorId} required onChange={e => setAuthorId(Number(e.target.value))}>
        <option>----- select -----</option>
        {authors && authors.map((author: AuthorType) => (
          <option key={author.id} value={author.id}>
            {author.first_name}{' '}{author.family_name}
          </option>
        ))}
      </select>
    </>
  )
}