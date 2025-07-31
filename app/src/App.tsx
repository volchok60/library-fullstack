import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Authors from './pages/Authors'
import AuthorDetails from './pages/AuthorDetails'
import AuthorCreate from './pages/AuthorCreate'
import AuthorEdit from './pages/AuthorEdit'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import BookCreate from './pages/BookCreate'
import BookEdit from './pages/BookEdit'
import Genres from './pages/Genres'
import GenreDetails from './pages/GenreDetails'
import GenreCreate from './pages/GenreCreate'
import GenreEdit from './pages/GenreEdit'
import Login from './pages/Login'
import SignUp from './pages/signup'
import RecoverPassword from './pages/recover-password'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:id" element={<AuthorDetails />} />
        <Route path="/authors/create" element={<AuthorCreate />} />
        <Route path="/authors/:id/edit" element={<AuthorEdit />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/create" element={<BookCreate />} />
        <Route path="/books/:id/edit" element={<BookEdit />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/genres/:id" element={<GenreDetails />} />
        <Route path="/genres/create" element={<GenreCreate />} />
        <Route path="/genres/:id/edit" element={<GenreEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
    </Layout>
  )
}

export default App