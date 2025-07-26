import { supabase } from './supabase'

export async function authorsCount() {
  const { count, error } = await supabase
    .from('authors')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching authors count:', error)
    throw new Error('Failed to fetch authors count')
  }

  return count?.toString() || '0'
}

export async function booksCount() {
  const { count, error } = await supabase
    .from('books')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching books count:', error)
    throw new Error('Failed to fetch books count')
  }

  return count?.toString() || '0'
}

export async function copiesCount() {
  const { count, error } = await supabase
    .from('book_copies')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching book copies count:', error)
    throw new Error('Failed to fetch book copies count')
  }

  return count?.toString() || '0'
}

export async function availableCopiesCount() {
  const { count, error } = await supabase
    .from('book_copies')
    .select('*', { count: 'exact', head: true })
    .eq('status', 5) // InLibrary status

  if (error) {
    console.error('Error fetching available book copies count:', error)
    throw new Error('Failed to fetch available book copies count')
  }

  return count?.toString() || '0'
}

export async function genresCount() {
  const { count, error } = await supabase
    .from('genres')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching genres count:', error)
    throw new Error('Failed to fetch genres count')
  }

  return count?.toString() || '0'
}

export async function getAuthors() {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .order('family_name', { ascending: true })

  if (error) {
    console.error('Error fetching authors:', error)
    throw new Error('Failed to fetch authors')
  }

  return data || []
}

export async function getGenres() {
  const { data, error } = await supabase
    .from('genres')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching genres:', error)
    throw new Error('Failed to fetch genres')
  }

  return data || []
}

export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      author:authors(*),
      genre:genres(*)
    `)
    .order('title', { ascending: true })

  if (error) {
    console.error('Error fetching books:', error)
    throw new Error('Failed to fetch books')
  }

  return data || []
}

export async function getBookCopies() {
  const { data, error } = await supabase
    .from('book_copies')
    .select(`
      *,
      book:books(
        *,
        author:authors(*),
        genre:genres(*)
      )
    `)
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching book copies:', error)
    throw new Error('Failed to fetch book copies')
  }

  return data || []
}

export async function getAuthor(id: number) {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching author:', error)
    throw new Error('Failed to fetch author')
  }

  return data
}

export async function getBook(id: number) {
  const { data, error } = await supabase
    .from('books')
    .select(`
      *,
      author:authors(*),
      genre:genres(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching book:', error)
    throw new Error('Failed to fetch book')
  }

  return data
}

export async function getGenre(id: number) {
  const { data, error } = await supabase
    .from('genres')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching genre:', error)
    throw new Error('Failed to fetch genre')
  }

  return data
}

export async function getBookCopy(id: number) {
  const { data, error } = await supabase
    .from('book_copies')
    .select(`
      *,
      book:books(
        *,
        author:authors(*),
        genre:genres(*)
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching book copy:', error)
    throw new Error('Failed to fetch book copy')
  }

  return data
}

export async function deleteAuthor(id: number) {
  const { data, error } = await supabase
    .from('authors')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error deleting author:', error)
    throw new Error('Failed to delete author')
  }

  return data
}

export async function deleteBook(id: number) {
  const { data, error } = await supabase
    .from('books')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error deleting book:', error)
    throw new Error('Failed to delete book')
  }

  return data
}

export async function deleteBookCopy(id: number) {
  const { data, error } = await supabase
    .from('book_copies')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error deleting book copy:', error)
    throw new Error('Failed to delete book copy')
  }

  return data
}

export async function deleteGenre(id: number) {
  const { data, error } = await supabase
    .from('genres')
    .delete()
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error deleting genre:', error)
    throw new Error('Failed to delete genre')
  }

  return data
}

export async function login(username: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  })

  if (error) {
    console.error('Error logging in:', error)
    throw new Error('Failed to login')
  }

  return { username: data.user?.email || username }
}

export async function createAuthor(authorData: any) {
  const { data, error } = await supabase
    .from('authors')
    .insert({
      first_name: authorData.firstName,
      family_name: authorData.familyName,
      birth_date: authorData.birthDate,
      death_date: authorData.deathDate,
      life_span: authorData.lifeSpan
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating author:', error)
    throw new Error('Failed to create author')
  }

  return data
}

export async function updateAuthor(id: number, authorData: any) {
  const { data, error } = await supabase
    .from('authors')
    .update({
      first_name: authorData.firstName,
      family_name: authorData.familyName,
      birth_date: authorData.birthDate,
      death_date: authorData.deathDate,
      life_span: authorData.lifeSpan
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating author:', error)
    throw new Error('Failed to update author')
  }

  return data
}

export async function createBook(bookData: any) {
  const { data, error } = await supabase
    .from('books')
    .insert({
      title: bookData.title,
      author_id: bookData.authorId,
      genre_id: bookData.genreId,
      summary: bookData.summary
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating book:', error)
    throw new Error('Failed to create book')
  }

  return data
}

export async function updateBook(id: number, bookData: any) {
  const { data, error } = await supabase
    .from('books')
    .update({
      title: bookData.title,
      author_id: bookData.author_id,
      genre_id: bookData.genre_id,
      summary: bookData.summary
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating book:', error)
    throw new Error('Failed to update book')
  }

  return data
}

export async function createGenre(genreData: any) {
  const { data, error } = await supabase
    .from('genres')
    .insert({
      name: genreData.name
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating genre:', error)
    throw new Error('Failed to create genre')
  }

  return data
}

export async function updateGenre(id: number, genreData: any) {
  const { data, error } = await supabase
    .from('genres')
    .update({
      name: genreData.name
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating genre:', error)
    throw new Error('Failed to update genre')
  }

  return data
}

export async function createBookCopy(copyData: any) {
  const { data, error } = await supabase
    .from('book_copies')
    .insert({
      book_id: copyData.bookId,
      imprint: copyData.imprint,
      due_back: copyData.dueBack,
      status: copyData.status,
      isbn: copyData.isbn
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating book copy:', error)
    throw new Error('Failed to create book copy')
  }

  return data
}

export async function updateBookCopy(id: number, copyData: any) {
  const { data, error } = await supabase
    .from('book_copies')
    .update({
      book_id: copyData.bookId,
      imprint: copyData.imprint,
      due_back: copyData.dueBack,
      status: copyData.status,
      isbn: copyData.isbn
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating book copy:', error)
    throw new Error('Failed to update book copy')
  }

  return data
}