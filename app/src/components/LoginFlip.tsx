import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function LoginFlip() {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    setUsername(localStorage.getItem('username'))
  }, [])

  function handleLogout() {
    localStorage.removeItem('username')
    setUsername(null)
    navigate('/')
  }

  if (username) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 text-sm font-medium">
          Welcome, {username}
        </span>
        <button 
          onClick={handleLogout} 
          className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    )
  }
  
  return (
    <Link 
      to="/login" 
      className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-teal-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
    >
      Login
    </Link>
  )
}