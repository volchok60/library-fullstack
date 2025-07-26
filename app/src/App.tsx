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
import Copies from './pages/Copies'
import CopyDetails from './pages/CopyDetails'
import CopyCreate from './pages/CopyCreate'
import CopyEdit from './pages/CopyEdit'
import Login from './pages/Login'

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
        <Route path="/copies" element={<Copies />} />
        <Route path="/copies/:id" element={<CopyDetails />} />
        <Route path="/copies/create" element={<CopyCreate />} />
        <Route path="/copies/:id/edit" element={<CopyEdit />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default App