import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../lib/api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    try {
      const user = await login(username, password)
      console.log('username: ' + user.username)
      localStorage.setItem("username", user.username)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className='mt-8'>
      <h1 className='mb-8 text-center m-2 text-teal-600 font-bold text-4xl'>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className='flex flex-col items-center'>
          <input 
            type="text" 
            required
            placeholder='Email' 
            value={username}
            onChange={e => setUsername(e.target.value)}
            className='mb-4 rounded-md border border-gray-300 p-2 w-64' 
          />
          <input 
            type="password" 
            required
            placeholder='Password' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className='mb-4 rounded-md border border-gray-300 p-2 w-64'
          />
          <Link to="/recover-password" className='mb-4'>
            <span className='text-teal-600 font-bold'>Forgot Password?</span>        
          </Link>
          <input 
            type="submit" 
            value="Log In" 
            className='mb-4 rounded-md bg-teal-600 text-white p-2 w-64 cursor-pointer font-bold'
          />
          <div>
            <span className='text-gray-600'>Don't have an account? </span>
            <Link to="/signup" className='mb-4'>
              <span className='text-teal-600 font-bold'>Sign Up</span>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}