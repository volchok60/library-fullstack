import { useState } from 'react'

export interface GenreType {
  id: number
  title: string
}

interface GenreProps { 
  genres: GenreType[]
  selectedId?: number
}

export default function Genre({ genres, selectedId}: GenreProps) {
  const [genreId, setGenreId] = useState(selectedId)

  return (
    <div className='flex flex-col mb-2'>
      <label className='self-start font-semibold mb-1'>Genre</label>
      <select name='genre_id' value={genreId} required 
        onChange={e => setGenreId(Number(e.target.value))}
        className='self-start mb-2 bg-white'>
        <option>----- select -----</option>
        {genres && genres.map((genre: GenreType) => (
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  )
}