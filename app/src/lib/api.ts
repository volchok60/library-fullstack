const baseUrl = import.meta.env.VITE_BASE_URL;

export async function authorsCount() {
  const resp = await fetch(`${baseUrl}/api/authors`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch authors count')
  }
  return resp.headers.get('x-result-count')
}

export async function booksCount() {
  const resp = await fetch(`${baseUrl}/api/books`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch books count')
  }
  return resp.headers.get('x-result-count')
}

export async function copiesCount() {
  const resp = await fetch(`${baseUrl}/api/copies`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch book copies count')
  }
  return resp.headers.get('x-result-count')
}

export async function availableCopiesCount() {
  const resp = await fetch(`${baseUrl}/api/copies/available`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch available book copies count')
  }
  return resp.headers.get('x-result-count')
}

export async function genresCount() {
  const resp = await fetch(`${baseUrl}/api/genres`, {
    method: "HEAD"
  })

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    throw new Error('Failed to fetch genres count')
  }
  return resp.headers.get('x-result-count')
}

export async function getAuthors() {
  const resp = await fetch(`${baseUrl}/api/authors`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch authors')
  }

  const authors = await resp.json()
  return authors
}

export async function getGenres() {
  const resp = await fetch(`${baseUrl}/api/genres`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch genres')
  }

  const genres = await resp.json()
  return genres
}

export async function getBooks() {
  const resp = await fetch(`${baseUrl}/api/books`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch books')
  }

  const books = await resp.json()
  return books
}

export async function getBookCopies() {
  const resp = await fetch(`${baseUrl}/api/copies`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch books')
  }

  const copies = await resp.json()
  return copies
}

export async function getAuthor(id: number) {
  const resp = await fetch(`${baseUrl}/api/authors/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Author')
  }

  const author = await resp.json()
  return author
}

export async function getBook(id: number) {
  const resp = await fetch(`${baseUrl}/api/books/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Book')
  }

  const book = await resp.json()
  return book
}

export async function getGenre(id: number) {
  const resp = await fetch(`${baseUrl}/api/genres/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch Genre')
  }

  const genre = await resp.json()
  return genre
}

export async function getBookCopy(id: number) {
  const resp = await fetch(`${baseUrl}/api/copies/${id}`)

  if (!resp.ok) {
    console.log('status:', resp.status, 'statusText:', resp.statusText)
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch BookCopy')
  }

  const bookCopy = await resp.json()
  return bookCopy
}

export async function deleteAuthor(id: number): Promise<number> {
  const response = await fetch(`/api/authors/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete author for id: ' + id);
  return id;
}

export async function deleteBook(id: number): Promise<number> {
  const response =  await fetch(`/api/books/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete book for id: ' + id);
  return id;
}

export async function deleteBookCopy(id: number): Promise<number> {
  const response = await fetch(`/api/copies/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete book copy for id: ' + id);
  return id;
}

export async function deleteGenre(id: number): Promise<number> {
  const response = await fetch(`/api/genres/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete genre for id: ' + id);
  return id;
}

export async function createAuthor(payload: {
  firstName: string;
  familyName: string;
  birthDate: Date;
  deathDate: Date | null;
  lifeSpan: string;
}) {
  const response = await fetch('/api/authors', {
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
  authorId: number;
  genreId: number;
  summary: string;
}) {
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create book');
  }
  return await response.json();
}

export async function createBookCopy(payload: {
  bookId: number;
  imprint: string;
    dueBack: Date | null;
    status: number;
    isbn: string;
}) {
  const response = await fetch('/api/copies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create book copy');
  }
  return await response.json();
}

export async function createGenre(payload: {
  name: string;
}) {
  const response = await fetch('/api/genres', {
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
  firstName: string;
  familyName: string;
  birthDate: Date;
  deathDate: Date | null;
  lifeSpan: string;
}) {
  const response = await fetch(`/api/authors/${id}`, {
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
  authorId: number;
  genreId: number;
  summary: string;
}) {
  const response = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update book');
  }
  return await response.json();
}

export async function updateBookCopy(id: number, payload: {
  bookId: number;
  imprint: string;
  dueBack: Date | null;
  status: number;
  isbn: string;
}) {
  const response = await fetch(`/api/copies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update book copy');
  }
  return await response.json();
}

export async function updateGenre(id: number, payload: {
  name: string;
}) {
  const response = await fetch(`/api/genres/${id}`, {
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
  const response = await fetch('/api/login', {
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
  const response = await fetch('/api/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return await response.json();
}

export async function getCurrentUser() {
  const response = await fetch('/api/current_user');

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  return await response.json();
}

export async function getUserPermissions() {
  const response = await fetch('/api/permissions');

  if (!response.ok) {
    throw new Error('Failed to fetch user permissions');
  }

  return await response.json();
}

export async function getUserRoles() {
  const response = await fetch('/api/roles');

  if (!response.ok) {
    throw new Error('Failed to fetch user roles');
  }

  return await response.json();
}

export async function getUserProfile() {
  const response = await fetch('/api/profile');

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
  const response = await fetch('/api/profile', {
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
  const response = await fetch('/api/change_password', {
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
  const response = await fetch('/api/reset_password', {
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
  const response = await fetch(`/api/verify_email?token=${token}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to verify email');
  }

  return await response.json();
}

export async function requestEmailVerification(email: string) {
  const response = await fetch('/api/request_email_verification', {
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
  const response = await fetch('/api/notifications');

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return await response.json();
}

export async function markNotificationAsRead(id: number) {
  const response = await fetch(`/api/notifications/${id}/read`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to mark notification as read');
  }

  return await response.json();
}

export async function deleteNotification(id: number) {
  const response = await fetch(`/api/notifications/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete notification');
  }

  return await response.json();
}

export async function getUserActivity() {
  const response = await fetch('/api/activity');

  if (!response.ok) {
    throw new Error('Failed to fetch user activity');
  }

  return await response.json();
}

export async function getUserSettings() {
  const response = await fetch('/api/settings');

  if (!response.ok) {
    throw new Error('Failed to fetch user settings');
  }

  return await response.json();
}
