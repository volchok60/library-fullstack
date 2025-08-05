const baseUrl = import.meta.env.VITE_BASE_URL;

export interface GenreType {
  id: number
  title: string
}

export interface AuthorType {
  id: number
  first_name: string
  family_name: string
  birth_date: Date
  death_date: Date | null
  life_span: string
}

export interface BookType {
  id: number
  title: string
  author_id: number
  genre_id: number
  summary: string
  imprint: string
  due_back: Date | null
  status: number
  isbn: string
}

enum BookStatus {
  NotAvailable,
  OnOrder,      
  InTransit,    
  OnHold,       
  OnLoan,       
  InLibrary     
}

export function getBookStatuses() {
  return Object.values(BookStatus).filter((value) => typeof value === "string");
}

export async function authorsCount() {
  const resp = await fetch(`${baseUrl}/api/v1/authors`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch authors count')
  }
  return resp.headers.get('x-result-count')
}

export async function booksCount() {
  const resp = await fetch(`${baseUrl}/api/v1/books`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch books count')
  }
  return resp.headers.get('x-result-count')
}

export async function availableBooksCount() {
  const resp = await fetch(`${baseUrl}/api/v1/books/available`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch available book copies count')
  }
  return resp.headers.get('x-result-count')
}

export async function genresCount() {
  const resp = await fetch(`${baseUrl}/api/v1/genres`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch genres count')
  }
  return resp.headers.get('x-result-count')
}

export async function getAuthors(): Promise<{ authors: AuthorType[], count: number }> {
  const resp = await fetch(`${baseUrl}/api/v1/authors`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch authors')
  }

  const authors = await resp.json()
  return authors
}

export async function getGenres(): Promise<{ genres: GenreType[], count: number }> {
  const resp = await fetch(`${baseUrl}/api/v1/genres`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch genres')
  }

  const genres = await resp.json()
  return genres
}

export async function getBooks(): Promise<{ books: BookType[], count: number }> {
  const resp = await fetch(`${baseUrl}/api/v1/books`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch books')
  }

  const books = await resp.json()
  return books
}

export async function getAvailableBooks(): Promise<{ books: BookType[], count: number }> {
  const resp = await fetch(`${baseUrl}/api/v1/books/available`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch available books')
  }

  const availableBooks = await resp.json()
  return availableBooks
}

export async function getAuthor(id: number): Promise<AuthorType> {
  const resp = await fetch(`${baseUrl}/api/v1/authors/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Author')
  }

  const author = await resp.json()
  return author
}

export async function getBook(id: number): Promise<BookType> {
  const resp = await fetch(`${baseUrl}/api/v1/books/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Book')
  }

  const book = await resp.json()
  return book
}

export async function getGenre(id: number): Promise<GenreType> {
  const resp = await fetch(`${baseUrl}/api/v1/genres/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Genre')
  }

  const genre = await resp.json()
  return genre
}

export async function deleteAuthor(id: number): Promise<number> {
  const response = await fetch(`${baseUrl}/api/v1/authors/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete author for id: ' + id);
  return id;
}

export async function deleteBook(id: number): Promise<number> {
  const response =  await fetch(`${baseUrl}/api/v1/books/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete book for id: ' + id);
  return id;
}

export async function deleteGenre(id: number): Promise<number> {
  const response = await fetch(`${baseUrl}/api/v1/genres/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete genre for id: ' + id);
  return id;
}

export async function createAuthor(payload: {
  first_name: string;
  family_name: string;
  birth_date: Date;
  death_date: Date | null;
  life_span: string;
}): Promise<AuthorType> {
  const response = await fetch(`${baseUrl}/api/v1/authors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create author');
  }
  return await response.json();
}

export async function createBook(payload: {
  title: string;
  author_id: number;
  genre_id: number;
  summary: string;
  imprint: string;
  due_back: Date | null;
  status: number;
  isbn: string;
}): Promise<BookType> {
  const response = await fetch(`${baseUrl}/api/v1/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create book');
  }
  return await response.json();
}

export async function createGenre(payload: {
  title: string;
}): Promise<GenreType> {
  const response = await fetch(`${baseUrl}/api/v1/genres`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create genre');
  }
  return await response.json();
}

export async function updateAuthor(id: number, payload: {
  first_name: string;
  family_name: string;
  birth_date: Date;
  death_date: Date | null;
  life_span: string;
}): Promise<AuthorType> {
  const response = await fetch(`${baseUrl}/api/v1/authors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update author');
  }
  return await response.json();
}

export async function updateBook(id: number, payload: {
  title: string;
  author_id: number;
  genre_id: number;
  summary: string;
  imprint: string;
  due_back: Date | null;
  status: number;
  isbn: string;
}): Promise<BookType> {
  const response = await fetch(`${baseUrl}/api/v1/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  return await response.json();
}

export async function updateGenre(id: number, payload: {
  title: string;
}): Promise<GenreType> {
  const response = await fetch(`${baseUrl}/api/v1/genres/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update genre');
  }
  return await response.json();
}

export async function login(username: string, password: string) {
  const response = await fetch(`${baseUrl}/api/v1/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
}

export async function logout() {
  const response = await fetch(`${baseUrl}/api/v1/logout`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return await response.json();
}

export async function getCurrentUser() {
  const response = await fetch(`${baseUrl}/api/v1/current_user`);

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  return await response.json();
}

export async function getUserPermissions() {
  const response = await fetch(`${baseUrl}/api/v1/permissions`);

  if (!response.ok) {
    throw new Error('Failed to fetch user permissions');
  }

  return await response.json();
}

export async function getUserRoles() {
  const response = await fetch(`${baseUrl}/api/v1/roles`);

  if (!response.ok) {
    throw new Error('Failed to fetch user roles');
  }

  return await response.json();
}

export async function getUserProfile() {
  const response = await fetch(`${baseUrl}/api/v1/profile`);

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return await response.json();
}

export async function updateUserProfile(payload: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const response = await fetch(`${baseUrl}/api/v1/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }

  return await response.json();
}

export async function changeUserPassword(oldPassword: string, newPassword: string) {
  const response = await fetch(`${baseUrl}/api/v1/change_password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error('Failed to change password');
  }

  return await response.json();
}

export async function resetUserPassword(email: string) {
  const response = await fetch(`${baseUrl}/api/v1/reset_password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to reset password');
  }

  return await response.json();
}

export async function verifyUserEmail(token: string) {
  const response = await fetch(`${baseUrl}/api/v1/verify_email?token=${token}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to verify email');
  }

  return await response.json();
}

export async function requestEmailVerification(email: string) {
  const response = await fetch(`${baseUrl}api/v1/request_email_verification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to request email verification');
  }

  return await response.json();
}

export async function getNotifications() {
  const response = await fetch(`${baseUrl}/api/v1/notifications`);

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return await response.json();
}

export async function markNotificationAsRead(id: number) {
  const response = await fetch(`${baseUrl}/api/v1/notifications/${id}/read`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to mark notification as read');
  }

  return await response.json();
}

export async function deleteNotification(id: number) {
  const response = await fetch(`${baseUrl}/api/v1/notifications/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete notification');
  }

  return await response.json();
}

export async function getUserActivity() {
  const response = await fetch(`${baseUrl}/api/v1/activity`);

  if (!response.ok) {
    throw new Error('Failed to fetch user activity');
  }

  return await response.json();
}

export async function getUserSettings() {
  const response = await fetch(`${baseUrl}/api/v1/settings`);

  if (!response.ok) {
    throw new Error('Failed to fetch user settings');
  }

  return await response.json();
}
